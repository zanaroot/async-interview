'use client';

import { uploadResumeMutation } from '@/actions/candidate/upload-resume';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useScopedI18n } from '@/packages/locales/client';

export const CandidateResumeUpload = ({
  id,
  trigger,
}: {
  id: number;
  trigger: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const client = useQueryClient();
  const t = useScopedI18n('candidate-resume-upload');

  const { mutate, isPending } = useMutation({
    mutationFn: uploadResumeMutation,
    onSuccess: () => {
      toast({
        title: t('toast'),
      });

      client.invalidateQueries({
        queryKey: ['candidate', 'details', id],
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClick = () => {
    if (!file) {
      return;
    }

    mutate({ candidateId: id, file });
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{trigger}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
          <Input
            id='resume'
            type='file'
            accept='.pdf'
            aria-label='Upload PDF resume'
            onChange={handleFileChange}
            className='cursor-pointer'
          />
          {file && <div>Selected file: {file.name}</div>}
          <Button type='button' onClick={handleClick}>
            {isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              t('submit')
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
