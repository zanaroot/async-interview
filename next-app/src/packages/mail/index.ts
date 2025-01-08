import { env } from '@/env';
import type { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  message: ReactNode
) => {
  const result = await resend.emails.send({
    from: 'Async Interview <mail@tchi.xyz>',
    to: email,
    subject,
    react: message,
  });

  return !!result.error;
};
