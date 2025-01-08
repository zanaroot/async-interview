import { db } from '@/packages/db';
import { UserOrganizationInviteTable } from '@/packages/db/schemas';
import { inArray } from 'drizzle-orm';

export const removeInvitationByIds = async (ids: string[]) =>
  db
    .delete(UserOrganizationInviteTable)
    .where(inArray(UserOrganizationInviteTable.id, ids));
