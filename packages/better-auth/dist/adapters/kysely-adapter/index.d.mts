import { Kysely } from 'kysely';
import { B as BetterAuthOptions, K as KyselyDatabaseType, A as AdapterDebugLogs, a as Adapter } from '../../shared/better-auth.CQWjPriQ.mjs';
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

declare function getKyselyDatabaseType(db: BetterAuthOptions["database"]): KyselyDatabaseType | null;
declare const createKyselyAdapter: (config: BetterAuthOptions) => Promise<{
    kysely: Kysely<any> | null;
    databaseType: KyselyDatabaseType | null;
}>;

interface KyselyAdapterConfig {
    /**
     * Database type.
     */
    type?: KyselyDatabaseType;
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: AdapterDebugLogs;
    /**
     * Use plural for table names.
     *
     * @default false
     */
    usePlural?: boolean;
    /**
     * Whether the database supports native date types.
     * When false, dates will be handled as ISO strings.
     *
     * @default Automatically determined based on database type:
     * - `false` for sqlite, mssql
     * - `true` for postgres, mysql
     */
    supportsDates?: boolean;
}
declare const kyselyAdapter: (db: Kysely<any>, config?: KyselyAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { KyselyDatabaseType, createKyselyAdapter, getKyselyDatabaseType, kyselyAdapter };
