'use client';

import { Button } from '@/components/ui/button';
import { actionOrgSessionGuard } from '@/server-functions/session';
import { useQuery } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NotAuthorized = ({ error }: { error: string }) => {
  const router = useRouter();
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: actionOrgSessionGuard,
  });

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='space-y-6 text-center'>
        <XCircle className='mx-auto h-24 w-24 text-destructive' />
        <h1 className='text-4xl font-bold tracking-tight'>{error}</h1>
        <p className='max-w-md text-xl text-muted-foreground'>
          Sorry, something went wrong !
        </p>
        {!session?.organizationId ? (
          <Button onClick={() => router.push('/organization/create')} size='lg'>
            create organization
          </Button>
        ) : (
          <Button onClick={() => router.push('/signin')} size='lg'>
            Go to Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
