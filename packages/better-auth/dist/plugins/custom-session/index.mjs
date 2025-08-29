import * as z from 'zod/v4';
import 'better-call';
import '../../shared/better-auth.Dk6y9Vrc.mjs';
import { a as createAuthEndpoint, c as createAuthMiddleware, b as getSession } from '../../shared/better-auth.BCc3zPBF.mjs';
import '../../shared/better-auth.CMQ3rA-I.mjs';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '../../shared/better-auth.BjBlybv-.mjs';
import '@better-auth/utils/binary';
import '../../shared/better-auth.n2KFGwjY.mjs';
import { g as getEndpointResponse } from '../../shared/better-auth.DQI8AD7d.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/hash';
import '../../crypto/index.mjs';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import 'jose';
import '@noble/hashes/scrypt';
import '@better-auth/utils';
import '@better-auth/utils/hex';
import '@noble/hashes/utils';
import '../../shared/better-auth.DdzSJf-n.mjs';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import '@better-auth/utils/random';
import '@better-fetch/fetch';
import '../../shared/better-auth.CuS_eDdK.mjs';
import '../../shared/better-auth.DF-MUmVw.mjs';
import '../../shared/better-auth.BZZKN1g7.mjs';
import 'jose/errors';
import '../../shared/better-auth.BUPPRXfK.mjs';
import 'defu';

const getSessionQuerySchema = z.optional(
  z.object({
    /**
     * If cookie cache is enabled, it will disable the cache
     * and fetch the session from the database
     */
    disableCookieCache: z.boolean().meta({
      description: "Disable cookie cache and fetch session from database"
    }).or(z.string().transform((v) => v === "true")).optional(),
    disableRefresh: z.boolean().meta({
      description: "Disable session refresh. Useful for checking session status, without updating the session"
    }).optional()
  })
);
const customSession = (fn, options, pluginOptions) => {
  return {
    id: "custom-session",
    hooks: {
      after: [
        {
          matcher: (ctx) => ctx.path === "/multi-session/list-device-sessions" && (pluginOptions?.shouldMutateListDeviceSessionsEndpoint ?? false),
          handler: createAuthMiddleware(async (ctx) => {
            const response = await getEndpointResponse(ctx);
            if (!response) return;
            const newResponse = await Promise.all(
              response.map(async (v) => await fn(v, ctx))
            );
            return ctx.json(newResponse);
          })
        }
      ]
    },
    endpoints: {
      getSession: createAuthEndpoint(
        "/get-session",
        {
          method: "GET",
          query: getSessionQuerySchema,
          metadata: {
            CUSTOM_SESSION: true,
            openapi: {
              description: "Get custom session data",
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        nullable: true,
                        items: {
                          $ref: "#/components/schemas/Session"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          requireHeaders: true
        },
        async (ctx) => {
          const session = await getSession()({
            ...ctx,
            asResponse: false,
            headers: ctx.headers,
            returnHeaders: true
          }).catch((e) => {
            return null;
          });
          if (!session?.response) {
            return ctx.json(null);
          }
          const fnResult = await fn(session.response, ctx);
          session.headers.forEach((value, key) => {
            ctx.setHeader(key, value);
          });
          return ctx.json(fnResult);
        }
      )
    }
  };
};

export { customSession };
