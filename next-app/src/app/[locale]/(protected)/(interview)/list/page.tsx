import Link from 'next/link';
import { InterviewListTable } from './_components/interviewListTable';
import { Button } from '@/components/ui/button';
import { getScopedI18n } from '@/packages/locales/server';
import { actionSessionGuard } from '@/server-functions/session';

const ListInterviewPage = async () => {
  await actionSessionGuard();
  const t = await getScopedI18n('interview-list-page');
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{t('title')}</h1>
        <Link href='/create' prefetch>
          <Button variant='default'> {t('create-interview')}</Button>
        </Link>
      </div>
      <InterviewListTable />
    </div>
  );
};

export default ListInterviewPage;
