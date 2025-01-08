'use server';

import { getList } from '@/models/interview/$get-list';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const interviewListQuery = async (page: number, pageSize: number) => {
  const session = await actionOrgSessionGuard();

  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const list = await getList(session.organizationId, limit, offset);

  return list;
};
