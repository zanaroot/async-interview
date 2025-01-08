'serer only';

import { db } from '@/packages/db';
import { OrganizationUserTable } from '@/packages/db/schemas';

export const createMassOrganizationUser = async (
  values: { userId: string; organizationId: string }[]
) => db.insert(OrganizationUserTable).values(values).returning();
