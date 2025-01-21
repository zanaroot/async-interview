'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ViewResponseVideo } from './viewResponseVideo';
import { useScopedI18n } from '@/packages/locales/client';
import { useQuery } from '@tanstack/react-query';
import { getAnswersQuery } from '@/actions/answer/get-answers';
import { createTemplate } from '@/actions/template/create-template';
import { Template } from '@/models/template/type';

type props = {
    candidateName?: string,
    interviewName?: string,
    interviewDescription?: string | null,
    interviewId: number,
    organisationId: string | undefined,
}

const CardInterview: React.FC<props> = ({ candidateName, interviewName, interviewDescription, interviewId, organisationId }) => {
    const t = useScopedI18n('inrtview-details');
    const { data } = useQuery({
        queryKey: ['answerQuery'],
        queryFn: () => getAnswersQuery(interviewId)
    })
    const handleCreateTemplate = async () => {
        if (!interviewId) {
            console.error('Interview manquant')
            return
        }
        const data: Template = {
            name: interviewName as string,
            description: interviewDescription,
            organizationId: organisationId as string
        }

        await createTemplate(data)
    }
    return (
        <div>
            <Card>
                <CardHeader className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <CardTitle className='text-xl text-neutral-200'>
                            {t('interview')} {interviewName}
                        </CardTitle>
                        <div className='space-x-2'>
                            <Button variant='outline'>Process</Button>
                            <Button
                                onClick={handleCreateTemplate}
                                variant='outline'
                                className='border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                            >
                                {t('create-as-template')}
                            </Button>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name' className='text-neutral-400'>
                                {t('candidate-name')}
                                <Label className='text-neutral-200'>
                                    {candidateName}

                                </Label>
                            </Label>
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-neutral-400'>
                                {t('interview-description')}
                            </Label>
                            <Label className='text-neutral-200'>{interviewDescription}</Label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='observations' className='text-neutral-400'>
                            {t('observations')}
                        </Label>
                        <Textarea
                            id='observations'
                            className='min-h-[100px]'
                            placeholder='Enter your observations'
                        />
                    </div>
                    <div className='space-y-4'>
                        <Label className='text-neutral-400'>{t('response')}</Label>
                        {data?.map((answer, index) => (
                            <div key={index} className='space-y-2'>
                                <Label className='text-sm'>
                                    {answer?.question?.order}. {answer?.question?.value}
                                </Label>
                                <div className='flex gap-2'>
                                    <Input
                                        defaultValue={answer.answer?.value ?? ''}
                                        placeholder='https://response-video-link'
                                        disabled
                                    />
                                    <ViewResponseVideo videoUrl={answer.answer?.value ?? ''} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardInterview
