import * as better_call from 'better-call';
import { B as BetterAuthOptions } from '../shared/better-auth.Bs92qm_m.cjs';
import { RequestEvent } from '@sveltejs/kit';
import 'kysely';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.cjs';
import '../shared/better-auth.e9wCjqAx.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const toSvelteKitHandler: (auth: {
    handler: (request: Request) => Response | Promise<Response>;
    options: BetterAuthOptions;
}) => (event: {
    request: Request;
}) => Response | Promise<Response>;
declare const svelteKitHandler: ({ auth, event, resolve, building, }: {
    auth: {
        handler: (request: Request) => Response | Promise<Response>;
        options: BetterAuthOptions;
    };
    event: RequestEvent;
    resolve: (event: RequestEvent) => Response | Promise<Response>;
    building: boolean;
}) => Promise<Response>;
declare function isAuthPath(url: string, options: BetterAuthOptions): boolean;
declare const sveltekitCookies: (getRequestEvent: () => RequestEvent<any, any>) => {
    id: "sveltekit-cookies";
    hooks: {
        after: {
            matcher(): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { isAuthPath, svelteKitHandler, sveltekitCookies, toSvelteKitHandler };
