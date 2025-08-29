import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../shared/better-auth.Bs92qm_m.cjs';
import 'kysely';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.cjs';
import '../shared/better-auth.e9wCjqAx.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const reactStartCookies: () => {
    id: "react-start-cookies";
    hooks: {
        after: {
            matcher(ctx: HookEndpointContext): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { reactStartCookies };
