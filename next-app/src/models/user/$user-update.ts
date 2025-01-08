'server only';

import { db } from '@/packages/db';
import { UserTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const Update = async (id: string, username: string) =>
  await db
    .update(UserTable)
    .set({ username: username })
    .where(eq(UserTable.id, id))
    .returning();
