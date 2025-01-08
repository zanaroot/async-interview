'use server';

import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { createSession, invalidateSession } from '@/models/session';

export const switchSessionOrganizationMutation = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const token = await getSessionTokenCookie();

  if (token === null) {
    return;
  }

  await invalidateSession(token);

  await deleteSessionTokenCookie();

  const session = await createSession(userId, organizationId);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
