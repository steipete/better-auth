import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../../shared/better-auth.IGoBAHaT.cjs';
import 'kysely';
import 'zod/v4';
import '../../shared/better-auth.D9UKno48.cjs';
import '../../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

interface BearerOptions {
    /**
     * If true, only signed tokens
     * will be converted to session
     * cookies
     *
     * @default false
     */
    requireSignature?: boolean;
}
/**
 * Converts bearer token to session cookie
 */
declare const bearer: (options?: BearerOptions) => {
    id: "bearer";
    hooks: {
        before: {
            matcher(context: HookEndpointContext): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                context: {
                    headers: Headers;
                };
            } | undefined>;
        }[];
        after: {
            matcher(context: HookEndpointContext): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { bearer };
