'use client';

import { inviteUserMutation } from '@/actions/user/invite-user';
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
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';

export const InputInviteUserModal = () => {
  const { toast } = useToast();
  const t = useScopedI18n('invite-user-dialog');
  const { mutate, isPending } = useMutation({
    mutationFn: inviteUserMutation,
    onSuccess: () => {
      toast({
        title: t('toast-success-title'),
        description: t('toast-success-description'),
      });
      window.location.reload();
    },
    onError: (error) => {
      toast({
        title: t('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      email: '',
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({ email: z.string().email() }),
    },
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{t('invite-button')}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Field name='email'>
                {(field) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='email'
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('email-placeholder')}
                  />
                )}
              </Field>
            </div>
            <Button type='submit' className='px-3'>
              {isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                t('invite-button')
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
