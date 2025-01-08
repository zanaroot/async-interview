'use server';

import { organizationUser } from '@/models/organization-user';

export const OrganizationsQuery = async (userId: string) => {
  const organizationUsers = await organizationUser(userId);

  return organizationUsers;
};
