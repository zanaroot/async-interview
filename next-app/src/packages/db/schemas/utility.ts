import { pgTable } from 'drizzle-orm/pg-core';

export const ImageTable = pgTable('image', (t) => ({
  id: t.serial('id').primaryKey(),
  url: t.varchar('url').notNull(),
  type: t.varchar('type'),
}));
