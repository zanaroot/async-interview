'use server';
import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { createSession, invalidateSession } from '@/models/session';
import { createOrganization } from '@/models/organization';
import { createOrganizationUser } from '@/models/organization-user';
import type { InsertOrganization } from '@/models/organization/type';
import { getSession } from '@/server-functions/session';

export const createOrganizationMutation = async (data: InsertOrganization) => {
  const { user } = await getSession();

  if (!user) {
    return [];
  }
  const [organization] = await createOrganization(data);

  await createOrganizationUser(user.id, organization.id);

  const token = await getSessionTokenCookie();
  if (token === null) {
    return null;
  }
  await invalidateSession(token);

  await deleteSessionTokenCookie();

  const session = await createSession(user.id, organization.id);

  await setSessionTokenCookie(session.id, session.expiresAt);

  return organization;
};
