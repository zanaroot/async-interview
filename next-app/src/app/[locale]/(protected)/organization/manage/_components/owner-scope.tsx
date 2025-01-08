'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditsOrganizationForm } from './credits-organization-forn';
import { DangerZone } from './danger-zone';
import { DetailsOrganizationForm } from './details-organization-form';
import { useScopedI18n } from '@/packages/locales/client';

export const OwnerScope = () => {
  const t = useScopedI18n('owner-scope');
  return (
    <div className='min-h-screen border-2 bg-background'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <DetailsOrganizationForm />
        <CreditsOrganizationForm />
        <DangerZone />
      </CardContent>
    </div>
  );
};
