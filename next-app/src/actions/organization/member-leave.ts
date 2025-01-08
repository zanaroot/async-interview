'use server';

import { verifyPassword } from '@/lib/password';
import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { getOneOrganizationByUserId } from '@/models/organization';
import { userLeaveOrganization } from '@/models/organization-user/user-leave';
import { createSession, invalidateSession } from '@/models/session';
import { userByEmailOrByUsername } from '@/models/user';
import { getSession } from '@/server-functions/session';
import { getScopedI18n } from '@/packages/locales/server';

export const memberLeaveOrzationMutation = async (confirmPassword: string) => {
  const { user, organization } = await getSession();
  const tError = await getScopedI18n('server-error');

  if (!user) {
    throw tError('not-authenticated');
  }

  const userConnected = await userByEmailOrByUsername(user?.email);

  if (!userConnected) {
    throw tError('invalid-email');
  }

  const isValidPassword = await verifyPassword(
    userConnected.password,
    confirmPassword
  );

  if (!isValidPassword) {
    throw tError('invalid-password');
  }

  const token = await getSessionTokenCookie();

  if (token === null) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();

  await userLeaveOrganization(user.id, organization?.id ?? '');

  const newOrg = await getOneOrganizationByUserId(user.id);

  const newOrganizationId = newOrg?.organizationId ?? null;

  const session = await createSession(user.id, newOrganizationId);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
