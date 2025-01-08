'use server';

import { getOneByUserOrganizationId } from '@/models/organization/$get-one-by-user-organization-id';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const FullInformationsQuery = async () => {
  const session = await actionOrgSessionGuard();

  const organization = await getOneByUserOrganizationId(session.organizationId);

  return organization;
};
