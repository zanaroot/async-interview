'server only';

import { eq } from 'drizzle-orm';

import { db } from '@/packages/db';
import { SessionTable } from '@/packages/db/schemas';

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(SessionTable).where(eq(SessionTable.id, sessionId));
};
