'serer only';

import { db } from '@/packages/db';
import type { InsertOrganization } from './type';
import { OrganizationTable } from '@/packages/db/schemas';

export const createOrganization = async (input: InsertOrganization) =>
  db.insert(OrganizationTable).values(input).returning();
