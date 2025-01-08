'use client';

import { Button } from '@/components/ui/button';

import { Eye, XCircle } from 'lucide-react';
import { useState } from 'react';

export const ViewResponseVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [viewvideo, setviewvideo] = useState(false);

  return (
    <div>
      <Button variant='outline' size='icon' onClick={() => setviewvideo(true)}>
        <Eye className='h-4 w-4' />
        <span className='sr-only'>View</span>
      </Button>

      {viewvideo ? (
        <div className='bg-opacity-50r fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-600'>
          <div className='z-10 flex max-h-screen flex-col'>
            <div className='absolute right-4 top-4 z-50 cursor-pointer'>
              <XCircle onClick={() => setviewvideo(false)} />
            </div>
            <video width='752' height='223' src={videoUrl} controls autoPlay />
          </div>
        </div>
      ) : null}
    </div>
  );
};
