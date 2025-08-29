import { b as AdapterConfig, C as CreateCustomAdapter, B as BetterAuthOptions, a as Adapter } from '../shared/better-auth.IGoBAHaT.cjs';
export { A as AdapterDebugLogs, e as AdapterTestDebugLogs, d as CleanedWhere, c as CustomAdapter } from '../shared/better-auth.IGoBAHaT.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.D9UKno48.cjs';
import '../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
