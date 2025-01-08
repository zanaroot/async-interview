import { OrganizationTable } from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const zOrganizationInsert = createInsertSchema(OrganizationTable, {
  name: z.string().min(1),
  description: z.string().min(1),
});
export const zOrganizationSelect = createSelectSchema(OrganizationTable);
export const zOrganizationUpdate = zOrganizationInsert.partial();

export type InsertOrganization = z.infer<typeof zOrganizationInsert>;
export type UpdateOrganization = z.infer<typeof zOrganizationUpdate>;
export type Organization = z.infer<typeof zOrganizationSelect>;
