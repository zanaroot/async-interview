'use client';

import { membersQuery } from '@/actions/organization/get-members';
import { transferOwnerMutation } from '@/actions/organization/transfer-owner';
import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { Dialog } from '@radix-ui/react-dialog';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Loader } from 'lucide-react';

export const TranferOwnerForm = () => {
  const { toast } = useToast();

  const t = useScopedI18n('transfer-owner-form');

  const { data: session } = useSession();

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: () => membersQuery(),
    enabled: !!session?.organization?.id,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transferOwnerMutation,
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
      newOwner: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutateAsync(values.value);
    },
  });

  return (
    <div className='flex w-full items-end justify-between gap-4'>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='danger' className='font-bold'>
            {t('select-email-labe')}
          </Label>
          <Label htmlFor='danger' className='text-sm text-muted-foreground'>
            {t('description')}
          </Label>
        </div>
        <Field name='newOwner'>
          {(field) => (
            <Select onValueChange={field.handleChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('select-trigger-placeholder')} />
              </SelectTrigger>
              <SelectContent position='item-aligned'>
                {members?.map((m) => (
                  <SelectItem
                    key={m.user.id}
                    value={m.user.id}
                    className='cursor-pointer'
                  >
                    {m.user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' type='button'>
            {t('dialog-trigger-button')}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('dialog-title')}</DialogTitle>
            <DialogDescription>{t('dialog-description')}</DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Field name='confirmPassword'>
                {(field) => (
                  <InputPassword
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('input-password-placeholder')}
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
              {isPending ? (
                <Loader className='animate-spin' />
              ) : (
                t('confitm-button')
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
