'use server';

import { getOrganization } from '@/models/organization/get-organization';
import type { Organization } from '@/models/organization/type';

export const getOneOrganizationQuery = async (data: Organization) => {
  const result = await getOrganization(data);
  return result;
};
