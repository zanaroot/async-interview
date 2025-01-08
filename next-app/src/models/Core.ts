import { db } from '@/packages/db';
import type { NodePgClient } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';

export type DBType =
  | PgTransaction<any, any, any>
  | (typeof db & { $client: NodePgClient });

export class Core {
  protected db: DBType = db;

  constructor(ctx?: DBType) {
    if (ctx) {
      this.db = ctx;
    }
  }
}
