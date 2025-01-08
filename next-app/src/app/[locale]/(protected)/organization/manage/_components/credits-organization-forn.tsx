'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScopedI18n } from '@/packages/locales/client';

export const CreditsOrganizationForm = () => {
  const t = useScopedI18n('creadits-organization-form');
  return (
    <Card className='flex items-center justify-between rounded-xl p-6'>
      <Badge variant='secondary' className='h-9 px-4 py-2'>
        {t('creadits-remaining', { number: 30 })}
      </Badge>
      <Button variant='outline' size='sm'>
        {t('buy-more-button')}
      </Button>
    </Card>
  );
};
