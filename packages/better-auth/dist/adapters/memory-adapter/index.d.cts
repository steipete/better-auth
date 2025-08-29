import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.IGoBAHaT.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.D9UKno48.cjs';
import '../../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

interface MemoryDB {
    [key: string]: any[];
}
interface MemoryAdapterConfig {
    debugLogs?: AdapterDebugLogs;
}
declare const memoryAdapter: (db: MemoryDB, config?: MemoryAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { memoryAdapter };
export type { MemoryAdapterConfig, MemoryDB };
