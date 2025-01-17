import {
  NotificationsTable,
  UserNotificationTable,
} from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const zNotificationsSelect = createSelectSchema(NotificationsTable);
export const zNotificationsInsert = createInsertSchema(NotificationsTable);

export const zUserNotificationsInsert = createInsertSchema(
  UserNotificationTable
);

export type SelectNotification = z.infer<typeof zNotificationsSelect>;
export type InsertNotification = z.infer<typeof zNotificationsInsert>;

export type InsertUserNotification = z.infer<typeof zUserNotificationsInsert>;
