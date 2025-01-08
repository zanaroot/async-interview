import type { TError } from '@/packages/locales/server';
import { z } from 'zod';

export const signinValidator = (t: TError) =>
  z.object({
    emailOrUsername: z
      .string()
      .min(1, t('min-email-or-username-length'))
      .max(255, t('max-email-or-username-length')),
    password: z
      .string()
      .min(6, t('min-password-length'))
      .max(255, t('max-password-length')),
  });
