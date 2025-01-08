'use server';

import { Update } from '@/models/user';
import { getSession } from '@/server-functions/session';

export const UpdateMutation = async ({ username }: { username: string }) => {
  const session = await getSession();

  const result = await Update(session?.user?.id as string, username);
  return result;
};
