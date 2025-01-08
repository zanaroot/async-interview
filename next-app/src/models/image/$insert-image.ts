'server only';

import { db } from '@/packages/db';
import { ImageTable } from '@/packages/db/schemas';

export const insertImage = async (inputs: { url: string; type?: string }[]) => {
  const images = await db.insert(ImageTable).values(inputs).returning();

  return images;
};
