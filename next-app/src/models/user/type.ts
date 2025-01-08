import { UserTable } from '@/packages/db/schemas';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const zUserSelect = createSelectSchema(UserTable);
export type User = z.infer<typeof zUserSelect>;
