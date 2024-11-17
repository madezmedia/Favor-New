import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL || 'file:local.db',
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

export * from './schema';
export type Database = typeof db;