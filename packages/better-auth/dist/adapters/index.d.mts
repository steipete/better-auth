import { b as AdapterConfig, C as CreateCustomAdapter, B as BetterAuthOptions, a as Adapter } from '../shared/better-auth.BH8RNaDG.mjs';
export { A as AdapterDebugLogs, e as AdapterTestDebugLogs, d as CleanedWhere, c as CustomAdapter } from '../shared/better-auth.BH8RNaDG.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.D9UKno48.mjs';
import '../shared/better-auth.BxBsTPUO.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
