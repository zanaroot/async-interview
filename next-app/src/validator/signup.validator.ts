import type { TError } from '@/packages/locales/server';
import { z } from 'zod';

export const signupSchema = (t: TError) =>
  z.object({
    username: z
      .string()
      .min(3, t('username-min-characters'))
      .max(31, t('username-max-characters'))
      .regex(/^[a-zA-Z0-9_-]+$/, t('username-invalid-characters')),
    email: z.string().email(t('invalid-email')).toLowerCase(),
    password: z
      .string()
      .min(6, t('min-password-length'))
      .max(255, t('max-password-length')),
    phone: z.string().min(10, t('phone-min-characters')),
    address: z.string().min(5, t('address-min-characters')),
    city: z.string().min(4, t('city-min-characters')),
    country: z.string().min(4, t('country-min-characters')),
    zipCode: z.string().min(2, t('zip-code-min-characters')),
  });
