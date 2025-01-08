'use client';

import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { questionsByInterviewIdQuery } from '@/actions/question/get-questions-interview';
import { useToast } from '@/hooks/use-toast';
import { QuestionDisplay } from './question-display';
import { insertAnswerMuation } from '@/actions/answer/insert';
import { useEffect, useRef, useState } from 'react';
import { uploadVideoMuation } from '@/actions/video/upload-video';

export const AutoRecorder = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const token = useParams().token?.toString();
  const { toast } = useToast();

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        toast({
          title: 'Error accessing webcam',
          description: (error as unknown as Error).message,
          variant: 'destructive',
        });
      }
    };

    enableVideoStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const {
    data: question,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['question'],
    queryFn: () => (token ? questionsByInterviewIdQuery(token) : null),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: UploadVideo } = useMutation({
    mutationKey: ['upload-video'],
    mutationFn: uploadVideoMuation,
    onError: (error: Error) => {
      toast({
        title: 'Error uploading video',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  useEffect(() => {
    if (mediaStream && question?.question?.id && !isRecording) {
      startRecording();
      UpdateStatusQuestion({
        questionId: question.question?.id,
        answerData: { value: null },
        interviewId: question.interview_question.interviewId,
      });
    }
  }, [mediaStream, question?.question?.id]);

  const { mutateAsync: UpdateStatusQuestion, isPending } = useMutation({
    mutationFn: insertAnswerMuation,
  });

  const startRecording = () => {
    if (mediaStream && !mediaRecorderRef.current) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
      });

      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (chunksRef.current.length > 0) {
          const video = new Blob(chunksRef.current, { type: 'video/webm' });

          UploadVideo(video, {
            onSuccess: (response) => {
              if (question?.question) {
                UpdateStatusQuestion({
                  questionId: question.question?.id,
                  answerData: { value: response },
                  interviewId: question.interview_question.interviewId,
                });
              }
            },
          });
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='w-full max-w-md rounded-lg shadow-md'
      />
      {isFetching || isPending ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className='flex space-x-4'>
            {isRecording ? (
              <Button variant='destructive' onClick={stopRecording}>
                Stop Recording
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (
                    !question ||
                    !question.question ||
                    !question.question.value
                  ) {
                    toast({
                      title: 'No question loaded',
                      description: 'Please wait and try again.',
                      variant: 'destructive',
                    });
                    return;
                  }
                  window.location.reload();
                }}
              >
                Next Question
              </Button>
            )}
          </div>
          {isRecording && (
            <QuestionDisplay
              isFetching={isFetching}
              questionValue={question?.question?.value || ''}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AutoRecorder;
