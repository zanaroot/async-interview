import { templateTable } from "@/packages/db/schemas/template";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const zTemplate = createInsertSchema(templateTable)
export type Template = z.infer<typeof zTemplate>