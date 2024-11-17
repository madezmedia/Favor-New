import type { Config } from 'drizzle-kit';
 
export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL || 'file:local.db',
    authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;