'server only';

import { db } from '@/packages/db';
import { SessionTable } from '@/packages/db/schemas';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import type { Session } from './type';

export const createSession = async (
  userId: string,
  organizationId: string | null
) => {
  const bytes = new Uint8Array(20);

  crypto.getRandomValues(bytes);

  const sessionId = encodeBase32LowerCaseNoPadding(bytes);

  const session: Session = {
    id: sessionId,
    userId,
    organizationId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insert(SessionTable).values(session);

  return session;
};
