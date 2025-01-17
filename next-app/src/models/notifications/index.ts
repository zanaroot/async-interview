'server only';
import {
  NotificationsTable,
  UserNotificationTable,
} from '@/packages/db/schemas';
import { Core, type DBType } from '../Core';
import type { InsertNotification, InsertUserNotification } from './type';
import { eq, and } from 'drizzle-orm';

export class NotificationsModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  createNotification = async (data: InsertNotification) => {
    const notification = await this.db
      .insert(NotificationsTable)
      .values(data)
      .returning();

    return notification;
  };

  createUserNotification = async (data: InsertUserNotification) => {
    const usernotification = await this.db
      .insert(UserNotificationTable)
      .values(data)
      .returning();

    return usernotification;
  };

  getAllUserNotification = async (userId: string, OrganizationId: string) => {
    const allUserNotifications = await this.db
      .select()
      .from(UserNotificationTable)
      .leftJoin(
        NotificationsTable,
        and(
          eq(UserNotificationTable.userId, userId),
          eq(NotificationsTable.organizationId, OrganizationId)
        )
      );

    return allUserNotifications;
  };

  deleteNotification = async (notificationId: number) => {
    const deletenotification = await this.db
      .delete(NotificationsTable)
      .where(eq(NotificationsTable.id, notificationId));
    return deletenotification;
  };

  updateStatusNotification = async (notificationId: number) => {
    const updatestatus = await this.db
      .update(NotificationsTable)
      .set({ status: 'read' })
      .where(eq(NotificationsTable.id, notificationId));

    return updatestatus;
  };
}
