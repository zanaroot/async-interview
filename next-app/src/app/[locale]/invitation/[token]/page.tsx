import { checkExistingInterview } from '@/actions/interview/check-existing-interview';
import { Recorder } from '../_components/recorder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Mic, Video } from 'lucide-react';
import { AutoRecorder } from '../_components/auto_recorder';

const InterviewPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const interview = await checkExistingInterview((await params).token);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <Card className='w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg'>
        <CardHeader className='bg-gradient-to-r from-gray-600 to-gray-700 p-6 text-white'>
          <CardTitle className='text-center text-4xl font-bold'>
            Async Interview 📸
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          {interview ? (
            <div className='space-y-8'>
              <div className='rounded-xl bg-gray-50 p-6 shadow-inner'>
                {interview?.status !== 'ongoing' && (
                  <div>
                    <p className='text-center text-2xl py-4  text-gray-700'>
                      Let&apos;s ensure your device is ready for the interview :
                    </p>
                    <div className='flex items-center justify-center mb-4'>
                      <Video className='text-red-400' />
                      <p className='px-8 text-black'>and</p>
                      <Mic className='text-red-400' />
                    </div>
                    <Recorder interviewId={interview?.id} />
                  </div>
                )}
                {interview?.status === 'ongoing' && <AutoRecorder />}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-4 py-12 text-red-600'>
              <AlertCircle size={64} />
              <p className='text-center text-xl font-semibold'>
                Your interview has expired
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPage;
