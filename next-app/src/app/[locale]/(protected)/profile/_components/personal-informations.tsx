'use client';

import { UpdateMutation } from '@/actions/user/user-update';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from '@/hooks/use-session';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Pencil } from 'lucide-react';

export const PersonalInformations = () => {
  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: UpdateMutation,
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Candidate observation is add successfully!.',
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      username: session?.user?.username ?? '',
    },

    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <CardTitle className='text-4xl font-normal'>Profile</CardTitle>
      <Card className='space-y-6 p-4'>
        <div className='space-y-2'>
          <h2 className='text-xl font-normal'>Personal Information</h2>
          <p className='text-gray-400'>
            Update your personal information and preferences.
          </p>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Field name='username'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
        <Button variant={'outline'}>Save</Button>
      </Card>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-xl font-normal'>Avatar</h2>
          <p className='text-gray-400'>Update your profile picture.</p>
        </div>
        <Avatar className='relative h-24 w-24'>
          <AvatarImage>{session?.user?.image}</AvatarImage>
          <AvatarFallback className='rounded-lg uppercase'>
            {session?.user?.username.charAt(0)}
            {session?.user?.username.charAt(1)}
          </AvatarFallback>
          <Button
            size='icon'
            variant='secondary'
            className='absolute bottom-1 right-1 h-8 w-8 rounded-full'
          >
            <Pencil className='h-4 w-4' />
            <span className='sr-only'>Edit avatar</span>
          </Button>
        </Avatar>
      </div>
    </form>
  );
};
