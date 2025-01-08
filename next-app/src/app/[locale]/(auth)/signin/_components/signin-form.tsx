'use client';

import Link from 'next/link';

import { signinMutation } from '@/actions/auth/signin';
import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export const SignInForm = () => {
  const tSignInForm = useScopedI18n('signin-form');
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: signinMutation,
    onSuccess: () => {
      toast({
        title: tSignInForm('toast-success-title'),
        description: tSignInForm('toast-success'),
      });

      router.push('/');
    },
    onError: (error: Error) => {
      toast({
        title: tSignInForm('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <form
      className='mx-auto grid w-[350px] gap-6'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold text-foreground'>
          {tSignInForm('title')}
        </h1>
        <p className='text-balance text-muted-foreground'>
          {tSignInForm('description')}
        </p>
      </div>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>
            {tSignInForm('email-or-username-label')}
          </Label>
          <Field name='emailOrUsername'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                type='text'
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignInForm('email-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='password'>{tSignInForm('password-label')}</Label>
            <Link
              href='/forgot-password'
              className='ml-auto inline-block text-sm underline'
            >
              {tSignInForm('forgot-password-link')}
            </Link>
          </div>
          <Field name='password'>
            {(field) => (
              <InputPassword
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='********'
              />
            )}
          </Field>
        </div>
        <Button type='submit' className='w-full'>
          {isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            tSignInForm('login-button')
          )}
        </Button>
      </div>
      <div className='mt-4 text-center text-sm'>
        {tSignInForm('no-account')}{' '}
        <Link href='signup' className='underline'>
          {tSignInForm('sign-up-link')}
        </Link>
      </div>
    </form>
  );
};
