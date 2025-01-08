'use server';

import {
  deleteOrganization,
  getOneOrganizationByUserId,
} from '@/models/organization';
import { userByEmailOrByUsername } from '@/models/user';
import { verifyPassword } from '@/lib/password';
import { createSession, invalidateSession } from '@/models/session';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/lib/session-cookies';
import { cookies } from 'next/headers';
import { getScopedI18n } from '@/packages/locales/server';

export const deleteOrganizationMutation = async ({
  organizationId,
  ownerEmail,
  confirmPassword,
}: {
  organizationId: string;
  ownerEmail: string;
  confirmPassword: string;
}) => {
  const tError = await getScopedI18n('server-error');
  const user = await userByEmailOrByUsername(ownerEmail);

  if (!user) {
    throw tError('invalid-email');
  }

  const isValidPassword = await verifyPassword(user.password, confirmPassword);

  if (!isValidPassword) {
    throw tError('invalid-password');
  }

  const cookieStore = await cookies();

  const token = cookieStore.get('session')?.value ?? null;

  if (token === null) {
    return;
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  await deleteOrganization(organizationId);
  const organization = await getOneOrganizationByUserId(user.id);
  const newOrganizationId = organization?.organizationId ?? null;
  const session = await createSession(user.id, newOrganizationId);
  await setSessionTokenCookie(session.id, session.expiresAt);
};
