'use server';

import { createOrganizationUser } from '@/models/organization-user/$create';
import { existInvitation } from '@/models/user-organization-invite/$exist-invitation';
import { inviteUser } from '@/models/user-organization-invite/$invite-user';
import { updateExpirationDateInvitation } from '@/models/user-organization-invite/$update-expiration-date-invitation';
import { checkExisting } from '@/models/user/$check-existing';
import { actionOrgSessionGuard } from '@/server-functions/session';
import { getScopedI18n } from '@/packages/locales/server';

export const inviteUserMutation = async ({ email }: { email: string }) => {
  const session = await actionOrgSessionGuard();
  const t = await getScopedI18n('invite-user');
  const existingUser = await checkExisting(email, email);

  if (existingUser) {
    await createOrganizationUser(existingUser.id, session.organizationId);

    return { message: t('user-added-to-organization') };
  }

  const existingInvitation = await existInvitation(
    email,
    session.organizationId
  );

  if (existingInvitation) {
    await updateExpirationDateInvitation(
      existingInvitation.id,
      new Date(new Date().setDate(new Date().getDate() + 3))
    );

    // TODO: send email with invitation id

    return { message: t('invitation-resent') };
  }

  await inviteUser(email, session.organizationId);

  // TODO: send email with invitation id

  return { message: t('invitation-sent') };
};
