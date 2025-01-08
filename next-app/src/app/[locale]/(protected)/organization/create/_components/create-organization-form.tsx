'use client';

import { createOrganizationMutation } from '@/actions/organization/create';
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
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Loader2 } from 'lucide-react';

export const CreateOrganizationForm = () => {
  const { toast } = useToast();
  const tCreateOrganizationForm = useScopedI18n('create-organization-form');

  const { data: session } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrganizationMutation,
    onSuccess: () => {
      toast({
        title: tCreateOrganizationForm('toast-success-title'),
        description: tCreateOrganizationForm('toast-success'),
      });

      window.location.href = '/organization/dashboard';
    },
    onError: (error: Error) => {
      toast({
        title: tCreateOrganizationForm('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      name: '',
      description: '',
      ownerId: session?.user?.id ?? '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      if (session?.user) {
        mutate(values.value);
      }
    },
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{tCreateOrganizationForm('title')}</CardTitle>
          <CardDescription>
            {tCreateOrganizationForm('description')}
          </CardDescription>
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
            <Field name='name'>
              {(field) => (
                <div className='space-y-2'>
                  <Label htmlFor={field.name}>
                    {tCreateOrganizationForm('name-label')}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='text'
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={tCreateOrganizationForm('name-placeholder')}
                  />
                </div>
              )}
            </Field>
            <Field name='description'>
              {(field) => (
                <div className='space-y-2'>
                  <Label htmlFor={field.name}>
                    {tCreateOrganizationForm('description-label')}
                  </Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={tCreateOrganizationForm(
                      'description-placeholder'
                    )}
                  />
                </div>
              )}
            </Field>
            <Button type='submit' className='mt-4'>
              {isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                tCreateOrganizationForm('submit-button')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
