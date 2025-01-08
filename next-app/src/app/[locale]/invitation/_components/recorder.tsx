'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Mic, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DeviceStatus } from './divice-status';
import PulsatingButton from '@/components/ui/pulsating-button';
import { useMutation } from '@tanstack/react-query';
import { updateStatusToOngoingMutation } from '@/actions/interview/update-status-to-ongoing';

export const Recorder = ({ interviewId }: { interviewId: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const chunksRef = useRef<Blob[]>([]);

  const { mutate } = useMutation({
    mutationFn: updateStatusToOngoingMutation,
    onSuccess: () => {
      toast({
        title: 'Interview updated successfully',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
  });

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

    // Cleanup function
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const startRecording = () => {
    mutate(interviewId);
    if (mediaStream) {
      // Reset previous recording
      chunksRef.current = [];

      // Create MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
      });

      // Event listeners for data collection
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Event listener for when recording stops
      mediaRecorderRef.current.onstop = () => {
        // Create a blob from the recorded chunks
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });

        // Create a URL for the recorded video
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideoUrl(videoURL);
      };

      // Start recording
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

  const downloadRecording = () => {
    if (recordedVideoUrl) {
      const a = document.createElement('a');
      a.href = recordedVideoUrl;
      a.download = `recording_${new Date().toISOString()}.webm`;
      a.click();
    }
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='w-full max-w-md rounded-lg shadow-md'
      />

      <div className='flex space-x-4'>
        {!isRecording ? (
          <Button onClick={startRecording} variant='default'>
            Start Test
          </Button>
        ) : (
          <Button onClick={stopRecording} variant='destructive'>
            Stop Test
          </Button>
        )}

        {recordedVideoUrl && (
          <>
            <Button onClick={downloadRecording} variant='outline'>
              Download Recording
            </Button>

            <PulsatingButton
              onClick={() => window.location.reload()}
              className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg font-semibold transition-colors duration-300 hover:from-blue-700 hover:to-indigo-700'
            >
              Start Interview
            </PulsatingButton>
          </>
        )}
      </div>

      {recordedVideoUrl && (
        <div className='mt-4 space-y-4'>
          <h3 className='mb-2 text-lg font-semibold'>Recorded Video</h3>
          <video
            src={recordedVideoUrl}
            controls
            className='w-full max-w-md rounded-lg shadow-md'
          />
          <div className='flex justify-center space-x-12'>
            <DeviceStatus icon={Video} label='Camera' />
            <DeviceStatus icon={Mic} label='Microphone' />
          </div>
          <div className='flex items-center justify-center space-x-2 text-green-600'>
            <CheckCircle size={24} />
            <span className='text-lg font-semibold'>Your device is ready!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recorder;
