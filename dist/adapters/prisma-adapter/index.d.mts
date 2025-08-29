import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.DkNEPIuu.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.DTtXpZYr.mjs';
import '../../shared/better-auth.2HpcRfGI.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

interface PrismaConfig {
    /**
     * Database provider.
     */
    provider: "sqlite" | "cockroachdb" | "mysql" | "postgresql" | "sqlserver" | "mongodb";
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
interface PrismaClient {
}
declare const prismaAdapter: (prisma: PrismaClient, config: PrismaConfig) => (options: BetterAuthOptions) => Adapter;

export { prismaAdapter };
export type { PrismaConfig };
