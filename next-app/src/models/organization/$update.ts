'server only';

import { db } from '@/packages/db';
import { OrganizationTable } from '@/packages/db/schemas';
import type { UpdateOrganization } from './type';
import { eq } from 'drizzle-orm';

export const updateOrganization = async (input: UpdateOrganization) => {
  if (!input.id) {
    throw new Error('Organization ID is required');
  }

  const result = await db
    .update(OrganizationTable)
    .set(input)
    .where(eq(OrganizationTable.id, input.id));

  return JSON.parse(JSON.stringify(result));
};
