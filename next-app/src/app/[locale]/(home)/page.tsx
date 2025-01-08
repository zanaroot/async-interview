import { getScopedI18n } from '@/packages/locales/server';
import { getSession } from '@/server-functions/session';
import Link from 'next/link';

const HomePage = async () => {
  const t = await getScopedI18n('hero');

  const { session } = await getSession();

  const agreedLink = () => {
    if (!session) {
      return '/signin';
    }
    return '/organization/dashboard';
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='max-w-2xl px-4 text-center'>
        <h1 className='mb-6 text-5xl font-bold text-foreground'>
          {t('title')}
        </h1>
        <p className='mb-8 text-xl text-gray-600'>{session?.userId}</p>
        <p className='mb-8 text-xl text-gray-600'>{t('description')}</p>
        <div className='flex justify-center space-x-4'>
          <Link href='https://www.google.com/search?q=cheapest+wordpress+freelancer'>
            <button
              disabled={!!session}
              className='rounded-lg bg-foreground px-6 py-3 text-white transition duration-300 hover:bg-foreground'
            >
              {t('fit-button')}
            </button>
          </Link>
          <Link href={agreedLink()}>
            <button className='rounded-lg bg-gray-200 px-6 py-3 text-gray-800 transition duration-300 hover:bg-gray-300'>
              {t('disagree-button')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
