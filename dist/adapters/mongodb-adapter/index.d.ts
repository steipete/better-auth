import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.C2av-DDK.js';
import { Db } from 'mongodb';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.DTtXpZYr.js';
import '../../shared/better-auth.CZoC82JS.js';
import 'jose';
import 'zod/v4/core';
import 'zod';

interface MongoDBAdapterConfig {
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: AdapterDebugLogs;
    /**
     * Use plural table names
     *
     * @default false
     */
    usePlural?: boolean;
}
declare const mongodbAdapter: (db: Db, config?: MongoDBAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { mongodbAdapter };
export type { MongoDBAdapterConfig };
