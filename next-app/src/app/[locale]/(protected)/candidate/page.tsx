import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CandidateTable } from './_components/candidate-table';
import { getScopedI18n } from '@/packages/locales/server';
import { actionSessionGuard } from '@/server-functions/session';

const CandidatePage = async () => {
  await actionSessionGuard();
  const t = await getScopedI18n('candidate-page');
  return (
    <main className='min-h-screen bg-background'>
      <h1 className='text-4xl font-bold'>{t('title')}</h1>
      <div className='flex w-full justify-end'>
        <Link href='/candidate/create'>
          <Button variant='default'>{t('create-candidate')}</Button>
        </Link>
      </div>
      <section className='mt-10'>
        <CandidateTable />
      </section>
    </main>
  );
};

export default CandidatePage;
