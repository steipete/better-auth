import { b as AdapterConfig, C as CreateCustomAdapter, B as BetterAuthOptions, a as Adapter } from '../shared/better-auth.DkNEPIuu.mjs';
export { A as AdapterDebugLogs, e as AdapterTestDebugLogs, d as CleanedWhere, c as CustomAdapter } from '../shared/better-auth.DkNEPIuu.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.mjs';
import '../shared/better-auth.2HpcRfGI.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
