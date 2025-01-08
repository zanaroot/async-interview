'use server';

import { getOneInterviewByPassword } from '@/models/interviewcandidat/$get-one-interview-by-password';
import { getScopedI18n } from '@/packages/locales/server';

export const verifPassword = async (password: string) => {
  const tError = await getScopedI18n('server-error');

  const interview = await getOneInterviewByPassword(password);
  if (interview) {
    return interview.token;
  } else {
    throw tError('invalid-password');
  }
};
