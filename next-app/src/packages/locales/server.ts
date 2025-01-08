import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./traduction/en'),
});

export type TError = Awaited<ReturnType<typeof getScopedI18n>>;
