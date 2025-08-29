import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.fpJnkfSu.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.DTtXpZYr.cjs';
import '../../shared/better-auth.C7l4WiP6.cjs';
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
