import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: `.env.local`, override: true });

export default {
  schema: "./database/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  },
  out: "./database/migrations"
} satisfies Config;
