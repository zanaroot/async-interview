import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { UserTable } from './auth';

export const OrganizationTable = pgTable('organization', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.varchar('name').notNull(),
  description: t.varchar('description'),
  ownerId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

export const OrganizationUserTable = pgTable('organization_user', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

export const UserOrganizationInviteTable = pgTable(
  'user_organization_invite',
  (t) => ({
    id: t
      .varchar('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    email: t.varchar('email').notNull(),
    organizationId: t
      .varchar('organization_id')
      .notNull()
      .references(() => OrganizationTable.id),
    expiresAt: t
      .timestamp('expires_at', {
        withTimezone: true,
        mode: 'date',
      })
      .notNull()
      .$defaultFn(() => new Date(new Date().setDate(new Date().getDate() + 3))),
  })
);

export const OrganizationRelations = relations(
  OrganizationTable,
  ({ one }) => ({
    owner: one(UserTable, {
      fields: [OrganizationTable.ownerId],
      references: [UserTable.id],
    }),
  })
);

export const OrganizationUserRelations = relations(
  OrganizationUserTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [OrganizationUserTable.userId],
      references: [UserTable.id],
    }),
    organization: one(OrganizationTable, {
      fields: [OrganizationUserTable.organizationId],
      references: [OrganizationTable.id],
    }),
  })
);
