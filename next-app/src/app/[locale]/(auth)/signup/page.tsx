import { getSession } from '@/server-functions/session';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { SignUpForm } from './_components/signup-form';

const SignUpPage = async () => {
  const { session } = await getSession();

  if (!!session) {
    redirect('/organization/dashboard');
  }

  return (
    <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
      <div className='flex items-center justify-center py-12'>
        <SignUpForm />
      </div>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/placeholder.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
};

export default SignUpPage;
