'use server';

import { verifyPassword } from '@/lib/password';
import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
} from '@/lib/session-cookies';
import { updateOrganizationOwner } from '@/models/organization/$update-owner';
import { invalidateSession } from '@/models/session';
import { userByEmailOrByUsername } from '@/models/user';
import { getSession } from '@/server-functions/session';
import { getScopedI18n } from '@/packages/locales/server';

export const transferOwnerMutation = async ({
  newOwner,
  confirmPassword,
}: {
  newOwner: string;
  confirmPassword: string;
}) => {
  const t = await getScopedI18n('server-error');
  const { session, user, organization } = await getSession();

  if (!session) {
    throw t('not-authenticated');
  }

  const userConnected = await userByEmailOrByUsername(user?.email);

  if (!userConnected) {
    throw t('invalid-email');
  }

  const isValidPassword = await verifyPassword(
    userConnected.password,
    confirmPassword
  );

  if (!isValidPassword) {
    throw t('invalid-password');
  }

  const token = await getSessionTokenCookie();

  if (token === null) {
    return;
  }

  if (!organization) {
    throw t('organization-not-found');
  }

  await invalidateSession(token);
  await deleteSessionTokenCookie();
  await updateOrganizationOwner(organization?.id, newOwner);
};
