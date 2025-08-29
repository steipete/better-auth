import * as better_call from 'better-call';
import { B as BetterAuthOptions, q as InferUser, r as InferSession, G as GenericEndpointContext, H as HookEndpointContext } from '../../shared/better-auth.Bs92qm_m.cjs';
import * as z from 'zod/v4';
import 'kysely';
import '../../shared/better-auth.DTtXpZYr.cjs';
import '../../shared/better-auth.e9wCjqAx.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

type CustomSessionPluginOptions = {
    /**
     * This option is used to determine if the list-device-sessions endpoint should be mutated to the custom session data.
     * @default false
     */
    shouldMutateListDeviceSessionsEndpoint?: boolean;
};
declare const customSession: <Returns extends Record<string, any>, O extends BetterAuthOptions = BetterAuthOptions>(fn: (session: {
    user: InferUser<O>;
    session: InferSession<O>;
}, ctx: GenericEndpointContext) => Promise<Returns>, options?: O, pluginOptions?: CustomSessionPluginOptions) => {
    id: "custom-session";
    hooks: {
        after: {
            matcher: (ctx: HookEndpointContext) => boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<Awaited<Returns>[] | undefined>;
        }[];
    };
    endpoints: {
        getSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: boolean | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Returns | null;
            } : Returns | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    disableCookieCache: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>]>>;
                    disableRefresh: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>;
                metadata: {
                    CUSTOM_SESSION: boolean;
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            nullable: boolean;
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                requireHeaders: true;
            } & {
                use: any[];
            };
            path: "/get-session";
        };
    };
};

export { customSession };
export type { CustomSessionPluginOptions };
