import { pgTable } from 'drizzle-orm/pg-core';


export const interviewTemplateTable = pgTable('template', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  interviewName: t.varchar().notNull(),
  interviewDescription:t.varchar().notNull(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

