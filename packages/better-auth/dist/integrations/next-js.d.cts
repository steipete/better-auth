import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../shared/better-auth.IGoBAHaT.cjs';
import 'kysely';
import 'zod/v4';
import '../shared/better-auth.D9UKno48.cjs';
import '../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

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
