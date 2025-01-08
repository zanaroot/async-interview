'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScopedI18n } from '@/packages/locales/client';

export const CardNoOrganization = () => {
  const tCardNoOrganization = useScopedI18n('card-no-organization');

  return (
    <Card className='mt-44 w-full max-w-2xl'>
      <div className='flex flex-col items-center justify-center gap-4 py-20'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>{tCardNoOrganization('title')}</h1>
          <p className='text-center text-sm'>
            {tCardNoOrganization('description')}
          </p>
          <p className='text-center text-sm'>
            {tCardNoOrganization('second-description')}
          </p>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <Button
            onClick={() => {
              window.location.href = '/organization/create';
            }}
          >
            {tCardNoOrganization('create-button')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
