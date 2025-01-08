'use client';

import { updateOrganizationMutation } from '@/actions/organization/update';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const DetailsOrganizationForm = () => {
  const { toast } = useToast();
  const t = useScopedI18n('details-organization-form');
  const { data: session } = useSession();

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationMutation,
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
      name: session?.organization?.name ?? '',
      description: session?.organization?.description ?? '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: async (values) => {
      await mutateAsync({
        id: session?.organization?.id ?? '',
        name: values.value.name,
        description: values.value.description,
      });
    },
  });

  return (
    <Card className='space-y-4'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='name'>{t('label-name')}</Label>
            <Field name='name'>
              {(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type='text'
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t('name-placeholder')}
                />
              )}
            </Field>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>{t('label-description')}</Label>
            <Field name='description'>
              {(field) => (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t('description-placeholder')}
                />
              )}
            </Field>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='mt-4 grid justify-self-end'
          >
            {t('button-save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
