import type { ReactElement } from 'react';
import { I18nProviderClient } from '../../packages/locales/client';

const SubLayout = async ({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) => {
  const { locale } = await params;

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
};

export default SubLayout;
