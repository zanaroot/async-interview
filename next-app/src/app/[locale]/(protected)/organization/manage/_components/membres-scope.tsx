'use client';

import { memberLeaveOrzationMutation } from '@/actions/organization/member-leave';
import { InputPassword } from '@/components/input-password';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const MembresScope = () => {
  const { data: session } = useSession();

  const { toast } = useToast();
  const t = useScopedI18n('membres-scope');

  const { mutate } = useMutation({
    mutationFn: memberLeaveOrzationMutation,
    onSuccess: () => {
      toast({
        title: t('toast-success-title'),
        description: t('toast-success'),
      });
      window.location.reload();
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
      confirmPassword: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value.confirmPassword);
    },
  });
  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl p-6'>
        <div className='mb-12 rounded-xl border bg-card p-6 shadow-sm dark:bg-gray-800/50'>
          <Label className='mb-2 text-2xl font-medium'>{t('title')}</Label>
          <div className='mb-12 space-y-4 rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
              <div>
                <Label htmlFor='name'>{t('lable-name')}</Label>
                <Input value={session?.organization?.name ?? ''} readOnly />
              </div>
              <Badge variant='secondary' className='h-9 px-4 py-2'>
                Credits remaining: 30
              </Badge>
            </div>
            <div>
              <Label htmlFor='description'>{t('lable-description')}</Label>

              <Textarea
                value={session?.organization?.description ?? ''}
                readOnly
              />
            </div>
          </div>
          <div className='mb-12 space-y-4 rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
            <div className='flex items-center justify-between'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='destructive'>
                    {t('leave-organization-button')}
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md'>
                  <DialogHeader>
                    <DialogTitle>
                      {t('leave-organization-dialog-title')}
                    </DialogTitle>
                    <DialogDescription>
                      {t('leave-organization-dialog-description')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className='flex items-center space-x-4'>
                    <div className='grid flex-1 gap-2'>
                      <Field name='confirmPassword'>
                        {(field) => (
                          <InputPassword
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={t('password-placeholder')}
                          />
                        )}
                      </Field>
                    </div>
                    <Button
                      type='submit'
                      size='sm'
                      className='px-3'
                      variant='destructive'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubmit();
                      }}
                    >
                      {t('leave-organization-dialog-confirm-button')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
