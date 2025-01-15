import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { OrganizationTable } from './organization';
import { StatusEnum } from './enums';
import { UserTable } from './auth';

export const NotificationsTable = pgTable('notification', (t) => ({
  id: t.serial('id').primaryKey(),
  values: varchar('values').notNull(),
  url: varchar('url'),
  status: StatusEnum('status').default('dismiss'),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
}));

export const UserNotificationTable = pgTable('usernotification', (t) => ({
  id: t.serial('id').primaryKey(),
  userId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  notificationId: t
    .integer('notification_id')
    .notNull()
    .references(() => NotificationsTable.id, { onDelete: 'cascade' }),
}));

export const UsernotificationRelations = relations(
  UserNotificationTable,
  ({ one }) => ({
    notification: one(NotificationsTable, {
      fields: [UserNotificationTable.notificationId],
      references: [NotificationsTable.id],
    }),

    owner: one(UserTable, {
      fields: [UserNotificationTable.userId],
      references: [UserTable.id],
    }),
  })
);



export const NotificationRelations = relations(
  NotificationsTable,
  ({ one }) => ({
    organization: one(OrganizationTable, {
      fields: [NotificationsTable.organizationId],
      references: [OrganizationTable.id],
    }),
  })
);
