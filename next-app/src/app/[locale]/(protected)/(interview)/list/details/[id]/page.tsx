import { oneInterviewQuery } from '@/actions/interview/get-one';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getScopedI18n } from '@/packages/locales/server';
import { ViewResponseVideo } from '../../_components/viewResponseVideo';
import { getAnswersQuery } from '@/actions/answer/get-answers';

const DetailsInterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const interview = await oneInterviewQuery((await params).id);
  const answers = await getAnswersQuery((await params).id);
  const t = await getScopedI18n('inrtview-details');

  return (
    <Card>
      <CardHeader className='space-y-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xl text-neutral-200'>
            {t('interview')} {interview?.name}
          </CardTitle>
          <div className='space-x-2'>
            <Button variant='outline'>Process</Button>
            <Button
              variant='outline'
              className='border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
            >
              {t('create-as-template')}
            </Button>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-neutral-400'>
              {t('candidate-name')}
              <Label className='text-neutral-200'>
                {' '}
                {interview?.candidate.name}{' '}
              </Label>
            </Label>
          </div>
          <div className='space-y-2'>
            <Label className='text-neutral-400'>
              {t('interview-description')}
            </Label>
            <Label className='text-neutral-200'>{interview?.description}</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='observations' className='text-neutral-400'>
            {t('observations')}
          </Label>
          <Textarea
            id='observations'
            className='min-h-[100px]'
            placeholder='Enter your observations'
          />
        </div>
        <div className='space-y-4'>
          <Label className='text-neutral-400'>{t('response')}</Label>
          {answers.map((answer, index) => (
            <div key={index} className='space-y-2'>
              <Label className='text-sm'>
                {answer.question?.order}. {answer.question?.value}
              </Label>
              <div className='flex gap-2'>
                <Input
                  defaultValue={answer.answer?.value ?? ''}
                  placeholder='https://response-video-link'
                  disabled
                />
                <ViewResponseVideo videoUrl={answer.answer?.value ?? ''} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsInterviewPage;
