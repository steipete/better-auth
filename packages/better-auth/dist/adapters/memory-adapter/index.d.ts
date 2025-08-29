import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.splEHBM8.js';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.D9UKno48.js';
import '../../shared/better-auth.DAyNR7ES.js';
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
