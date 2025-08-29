import { b as AdapterConfig, C as CreateCustomAdapter, B as BetterAuthOptions, a as Adapter } from '../shared/better-auth.fpJnkfSu.cjs';
export { A as AdapterDebugLogs, e as AdapterTestDebugLogs, d as CleanedWhere, c as CustomAdapter } from '../shared/better-auth.fpJnkfSu.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.cjs';
import '../shared/better-auth.C7l4WiP6.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
