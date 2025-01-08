'use server';

import { getSessionTokenCookie } from '@/lib/session-cookies';
import { validateSessionToken } from '@/models/session';

export const getSession = async () => {
  const token = await getSessionTokenCookie();

  if (token === null) {
    return { session: null, user: null, organization: null };
  }

  const result = await validateSessionToken(token);

  return result;
};

export const actionSessionGuard = async () => {
  const { session } = await getSession();

  if (!session) throw new Error('Not authenticated');

  return session;
};

export const actionOrgSessionGuard = async () => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!session?.organizationId) {
    throw new Error('No organization');
  }

  return session as {
    id: string;
    userId: string;
    organizationId: string;
    expiresAt: Date;
  };
};
