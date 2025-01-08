'server only';

import { db } from '@/packages/db';
import { UserTable } from '@/packages/db/schemas';
import type { InferInsertModel } from 'drizzle-orm';

export const create = async (input: InferInsertModel<typeof UserTable>) =>
  db.insert(UserTable).values(input).returning();
