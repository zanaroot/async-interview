'use client';
import { NotAuthorized } from '@/components/not-authorized';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <NotAuthorized error={error.message} />
    </main>
  );
};

export default ErrorPage;
