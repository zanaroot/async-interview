'use client';

import { signupMutation } from '@/actions/auth/signup';
import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignUpForm = () => {
  const { toast } = useToast();
  const tSignUpForm = useScopedI18n('signup-form');
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: signupMutation,
    onSuccess: () => {
      toast({
        title: tSignUpForm('toast-success-title'),
        description: tSignUpForm('toast-success'),
      });

      router.push('/');
    },
    onError: (error: Error) => {
      toast({
        title: tSignUpForm('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      zipCode: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <form
      className='mx-auto grid w-[500px] gap-6'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>{tSignUpForm('title')}</h1>
      </div>
      <div>
        <h3 className='text-balance text-center text-muted-foreground'>
          {tSignUpForm('description')}
        </h3>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='username'>{tSignUpForm('username-label')}</Label>
          <Field name='username'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('username-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>{tSignUpForm('email-label')}</Label>
          <Field name='email'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='email'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('email-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>{tSignUpForm('password-label')}</Label>
          <Field name='password'>
            {(field) => (
              <InputPassword
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('password-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='phone'>{tSignUpForm('phone-label')}</Label>
          <Field name='phone'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='tel'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('phone-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='address'>{tSignUpForm('address-label')}</Label>
          <Field name='address'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('address-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='city'>{tSignUpForm('city-label')}</Label>
          <Field name='city'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('city-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='country'>{tSignUpForm('country-label')}</Label>
          <Field name='country'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('country-placeholder')}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='zipCode'>{tSignUpForm('zip-code-label')}</Label>
          <Field name='zipCode'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={tSignUpForm('zip-code-placeholder')}
              />
            )}
          </Field>
        </div>
      </div>
      <Button type='submit' variant='default'>
        {isPending ? (
          <Loader2 className='animate-spin' />
        ) : (
          tSignUpForm('sign-up-button')
        )}
      </Button>
      <div className='mt-4 text-center text-sm'>
        {tSignUpForm('already-have-account')}{' '}
        <Link href='/signin' className='underline'>
          {tSignUpForm('login-button')}
        </Link>
      </div>
    </form>
  );
};
