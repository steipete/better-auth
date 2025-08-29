import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.6m9muJRT.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.DTtXpZYr.mjs';
import '../../shared/better-auth.XX3IEFux.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';
import 'node:sqlite';

interface DB {
    [key: string]: any;
}
interface DrizzleAdapterConfig {
    /**
     * The schema object that defines the tables and fields
     */
    schema?: Record<string, any>;
    /**
     * The database provider
     */
    provider: "pg" | "mysql" | "sqlite";
    /**
     * If the table names in the schema are plural
     * set this to true. For example, if the schema
     * has an object with a key "users" instead of "user"
     */
    usePlural?: boolean;
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: AdapterDebugLogs;
    /**
     * By default snake case is used for table and field names
     * when the CLI is used to generate the schema. If you want
     * to use camel case, set this to true.
     * @default false
     */
    camelCase?: boolean;
}
declare const drizzleAdapter: (db: DB, config: DrizzleAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { drizzleAdapter };
export type { DB, DrizzleAdapterConfig };
