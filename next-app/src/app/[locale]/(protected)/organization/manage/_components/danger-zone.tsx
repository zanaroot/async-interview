'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteOrganizationModal } from './delete-organization-modal';
import { TranferOwnerForm } from './tranfer-owner-form';
import { useScopedI18n } from '@/packages/locales/client';
export const DangerZone = () => {
  const t = useScopedI18n('danger-zone');
  return (
    <Card className='mb-12 space-y-4 border-2 border-destructive'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <TranferOwnerForm />
      </CardContent>
      <CardFooter>
        <DeleteOrganizationModal />
      </CardFooter>
    </Card>
  );
};
