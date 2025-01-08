'use client';

import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    if (error.digest) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [error.digest]);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='space-y-6 text-center'>
        <CheckCircle className='mx-auto h-24 w-24 text-green-600' />
        <h1 className='text-4xl font-bold tracking-tight'>{error.message}</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
