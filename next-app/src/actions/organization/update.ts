'use server';

import type { UpdateOrganization } from '@/models/organization/type';
import { updateOrganization } from '@/models/organization';

export const updateOrganizationMutation = async (input: UpdateOrganization) => {
  const result = await updateOrganization(input);

  return result;
};
