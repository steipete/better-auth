import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../shared/better-auth.CNbgPNhQ.js';
import 'kysely';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.js';
import '../shared/better-auth.BrqjqzND.js';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';
import 'node:sqlite';

declare function toNextJsHandler(auth: {
    handler: (request: Request) => Promise<Response>;
} | ((request: Request) => Promise<Response>)): {
    GET: (request: Request) => Promise<Response>;
    POST: (request: Request) => Promise<Response>;
};
declare const nextCookies: () => {
    id: "next-cookies";
    hooks: {
        after: {
            matcher(ctx: HookEndpointContext): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { nextCookies, toNextJsHandler };
