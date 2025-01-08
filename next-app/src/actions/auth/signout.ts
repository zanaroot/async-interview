'use server';

import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
} from '@/lib/session-cookies';
import { invalidateSession } from '@/models/session';

export const signoutMutation = async () => {
  const token = await getSessionTokenCookie();

  if (token === null) {
    return true;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();

  return true;
};
