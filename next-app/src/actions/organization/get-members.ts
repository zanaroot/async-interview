'use server';

import { getUserByOrganizationId } from '@/models/organization-user/$getUserByOrganizationId';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const membersQuery = async () => {
  const session = await actionOrgSessionGuard();

  const result = await getUserByOrganizationId(session.organizationId);

  return result;
};
