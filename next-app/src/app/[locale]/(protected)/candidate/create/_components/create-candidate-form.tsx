'use client';

import { createCandidateMutation } from '@/actions/candidate/create-candidate';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Briefcase, Loader2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useScopedI18n } from '@/packages/locales/client';

export const CreateCandidateForm = () => {
  const router = useRouter();
  const t = useScopedI18n('create-candidate-form');

  const { mutate, isPending } = useMutation({
    mutationFn: createCandidateMutation,
    onSuccess: (response) => {
      toast({
        title: t('toast-success-title'),
        description: t('toast-success'),
      });

      router.push(`/candidate/${response.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: t('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
    },
    onSubmit: (values) => {
      mutate(values.value);
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          className='space-y-8'
        >
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium'>
                {t('full-name')}
              </Label>
              <Field name='name'>
                {(field) => (
                  <div className='relative'>
                    <User className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder={t('full-name-placeholder')}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium'>
                {t('email-label')}
              </Label>
              <Field name='email'>
                {(field) => (
                  <div className='relative'>
                    <Mail className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='email'
                      placeholder='john@example.com'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-sm font-medium'>
                {t('phone-label')}
              </Label>
              <Field name='phone'>
                {(field) => (
                  <div className='relative'>
                    <Phone className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='tel'
                      placeholder='+1 (555) 000-0000'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address' className='text-sm font-medium'>
                {t('address')}
              </Label>
              <Field name='address'>
                {(field) => (
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder='123 Main St, City'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2 md:col-span-2'>
              <Label htmlFor='title' className='text-sm font-medium'>
                {t('job-title')}
              </Label>
              <Field name='title'>
                {(field) => (
                  <div className='relative'>
                    <Briefcase className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder='Software Engineer'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className='flex justify-end'>
            <Button
              type='submit'
              size='lg'
              disabled={isPending}
              className='min-w-[150px]'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {t('submit-loading')}
                </>
              ) : (
                `${t('submit')}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
