'use client';

import { allCandidateQuery } from '@/actions/candidate/get-all-candidate';
import type { CreateInterviewPayload } from '@/actions/interview/create-interview';
import { createInterviewMutation } from '@/actions/interview/create-interview';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, Send, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { useScopedI18n } from '@/packages/locales/client';

interface Question {
  id: string;
  text: string;
}

export default function CreateInterview() {
  const t = useScopedI18n('create-interview');
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '' },
  ]);

  const client = useQueryClient();

  const addQuestion = () => {
    setQuestions([...questions, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const { data: candidates } = useQuery({
    queryKey: ['candidate'],
    queryFn: allCandidateQuery,
  });

  const { mutate: createInterview, isPending } = useMutation({
    mutationKey: ['createInterview'],
    mutationFn: createInterviewMutation,
    onSuccess: () => {
      toast({
        title: t('toast-success-title'),
        description: t('toast-success'),
      });

      client.invalidateQueries({ queryKey: ['interviews'] });

      router.push('/list');
    },
    onError: (error) => {
      toast({
        title: t('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      name: '',
      description: '',
    } as CreateInterviewPayload,
    onSubmit: (valeur) => {
      const data = {
        name: valeur.value.name,
        description: valeur.value.description,
        candidateId: Number(valeur.value.candidateId),
        expiresAt: valeur.value.expiresAt,
        questions,
      };
      createInterview(data);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        candidateId: z.number().min(1),
        expiresAt: z.date().min(new Date()),
      }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      className='container mx-auto p-6'
    >
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Candidate Selection */}
          <div className='space-y-4'>
            <Label>{t('candidate-selection')}</Label>
            <div className='flex items-center gap-4'>
              <Field name='candidateId'>
                {(field) => (
                  <Select onValueChange={(e) => field.handleChange(Number(e))}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Choose a candidate' />
                    </SelectTrigger>

                    <SelectContent>
                      {candidates?.map((candidate, cle) => (
                        <SelectItem key={cle} value={candidate.id.toString()}>
                          {candidate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    {/*  */}
                  </Select>
                )}
              </Field>
              <span className='text-sm text-muted-foreground'>or</span>
              <Button variant='outline' asChild>
                <Link href='/candidate/create'>
                  <User className='mr-2 h-4 w-4' />
                  {t('new-candidate')}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>

        <CardContent className='space-y-6'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{t('interview-name')}</Label>
              <Field name='name'>
                {(field) => (
                  <Input
                    id={field.name}
                    placeholder='e.g., Senior Developer Technical Interview'
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </Field>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>{t('interview-description')}</Label>
              <Field name='description'>
                {(field) => (
                  <Textarea
                    id={field.name}
                    placeholder='e.g., Senior Developer Technical Interview'
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='min-h-[100px]'
                  />
                )}
              </Field>
            </div>
          </div>
          <Separator />

          {/* Date Selection */}
          <div className='space-y-4'>
            <Label>{t('invitation-expiration-date')}</Label>
            <Field name='expiresAt'>
              {(field) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.state.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.state.value
                        ? format(field.state.value, 'PPP')
                        : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.state.value}
                      onSelect={(e) => field.handleChange(e ?? new Date())}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </Field>
          </div>

          <Separator />

          {/* Questions */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Label>{t('interview-questions')}</Label>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addQuestion}
              >
                <Plus className='mr-2 h-4 w-4' />
                {t('add-question')}
              </Button>
            </div>

            <div className='space-y-4'>
              {questions.map((question, index) => (
                <div key={question.id} className='flex gap-2'>
                  <div className='flex-1 space-y-2'>
                    <Label htmlFor={question.id} className='sr-only'>
                      {t('question-number', { number: index + 1 })}
                    </Label>
                    <Input
                      id={question.id}
                      placeholder={`Question ${index + 1}`}
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(question.id, e.target.value)
                      }
                    />
                  </div>
                  {questions.length > 1 && (
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={() => removeQuestion(question.id)}
                      className='shrink-0'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-end space-x-4'>
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type='submit'
                disabled={isPending || !canSubmit || isSubmitting}
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {t('send-invitation-loading')}
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    {t('send-invitation')}
                  </>
                )}
              </Button>
            )}
          </Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
