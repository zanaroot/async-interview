import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { UserRoleEnum } from './enums';
import { OrganizationTable } from './organization';

export const UserTable = pgTable('user', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: t.varchar('username', { length: 255 }).notNull(),
  password: t.varchar('password', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  address: t.varchar('address', { length: 255 }),
  phone: t.varchar('phone', { length: 255 }),
  city: t.varchar('city', { length: 255 }),
  country: t.varchar('country', { length: 255 }),
  zipCode: t.varchar('zip_code', { length: 255 }),
  emailVerified: t.timestamp('email_verified', {
    mode: 'date',
    withTimezone: true,
  }),
  image: t.varchar('image', { length: 255 }),
  role: UserRoleEnum('role').default('customer'),
}));

export const SessionTable = pgTable('session', (t) => ({
  id: t.varchar('id').primaryKey(),
  userId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id),
  organizationId: t
    .varchar('organization_id')
    .references(() => OrganizationTable.id),
  expiresAt: t
    .timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
}));

export const SessionRelations = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id],
  }),
  organization: one(OrganizationTable, {
    fields: [SessionTable.organizationId],
    references: [OrganizationTable.id],
  }),
}));
