import { g as getJwtToken, s as signJWT, b as getJwksAdapter, c as createJwk } from '../../shared/better-auth.BttC_x9D.mjs';
export { a as generateExportedKeyPair } from '../../shared/better-auth.BttC_x9D.mjs';
import { APIError } from 'better-call';
import '../../shared/better-auth.Dk6y9Vrc.mjs';
import { c as createAuthMiddleware, a as createAuthEndpoint, s as sessionMiddleware } from '../../shared/better-auth.BCc3zPBF.mjs';
import 'zod/v4';
import { B as BetterAuthError } from '../../shared/better-auth.DdzSJf-n.mjs';
import '../../shared/better-auth.CMQ3rA-I.mjs';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '../../shared/better-auth.BjBlybv-.mjs';
import '@better-auth/utils/binary';
import { m as mergeSchema } from '../../shared/better-auth.n2KFGwjY.mjs';
import z from 'zod';
import 'jose';
import '../../crypto/index.mjs';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import '@noble/hashes/scrypt';
import '@better-auth/utils';
import '@better-auth/utils/hex';
import '@noble/hashes/utils';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import '@better-auth/utils/random';
import '../../shared/better-auth.DF-MUmVw.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BZZKN1g7.mjs';
import '../../shared/better-auth.CuS_eDdK.mjs';
import '@better-fetch/fetch';
import 'jose/errors';
import '../../shared/better-auth.BUPPRXfK.mjs';
import 'defu';

const schema = {
  jwks: {
    fields: {
      publicKey: {
        type: "string",
        required: true
      },
      privateKey: {
        type: "string",
        required: true
      },
      createdAt: {
        type: "date",
        required: true
      }
    }
  }
};

const jwt = (options) => {
  if (options?.jwt?.sign && !options.jwks?.remoteUrl) {
    throw new BetterAuthError(
      "jwks_config",
      "jwks.remoteUrl must be set when using jwt.sign"
    );
  }
  if (options?.jwks?.remoteUrl && !options.jwks?.keyPairConfig?.alg) {
    throw new BetterAuthError(
      "jwks_config",
      "must specify alg when using the oidc plugin and jwks.remoteUrl"
    );
  }
  return {
    id: "jwt",
    options,
    endpoints: {
      getJwks: createAuthEndpoint(
        "/jwks",
        {
          method: "GET",
          metadata: {
            openapi: {
              description: "Get the JSON Web Key Set",
              responses: {
                "200": {
                  description: "JSON Web Key Set retrieved successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          keys: {
                            type: "array",
                            description: "Array of public JSON Web Keys",
                            items: {
                              type: "object",
                              properties: {
                                kid: {
                                  type: "string",
                                  description: "Key ID uniquely identifying the key, corresponds to the 'id' from the stored Jwk"
                                },
                                kty: {
                                  type: "string",
                                  description: "Key type (e.g., 'RSA', 'EC', 'OKP')"
                                },
                                alg: {
                                  type: "string",
                                  description: "Algorithm intended for use with the key (e.g., 'EdDSA', 'RS256')"
                                },
                                use: {
                                  type: "string",
                                  description: "Intended use of the public key (e.g., 'sig' for signature)",
                                  enum: ["sig"],
                                  nullable: true
                                },
                                n: {
                                  type: "string",
                                  description: "Modulus for RSA keys (base64url-encoded)",
                                  nullable: true
                                },
                                e: {
                                  type: "string",
                                  description: "Exponent for RSA keys (base64url-encoded)",
                                  nullable: true
                                },
                                crv: {
                                  type: "string",
                                  description: "Curve name for elliptic curve keys (e.g., 'Ed25519', 'P-256')",
                                  nullable: true
                                },
                                x: {
                                  type: "string",
                                  description: "X coordinate for elliptic curve keys (base64url-encoded)",
                                  nullable: true
                                },
                                y: {
                                  type: "string",
                                  description: "Y coordinate for elliptic curve keys (base64url-encoded)",
                                  nullable: true
                                }
                              },
                              required: ["kid", "kty", "alg"]
                            }
                          }
                        },
                        required: ["keys"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          if (options?.jwks?.remoteUrl) {
            throw new APIError("NOT_FOUND");
          }
          const adapter = getJwksAdapter(ctx.context.adapter);
          const keySets = await adapter.getAllKeys();
          if (keySets.length === 0) {
            const key = await createJwk(ctx, options);
            keySets.push(key);
          }
          const keyPairConfig = options?.jwks?.keyPairConfig;
          const defaultCrv = keyPairConfig ? "crv" in keyPairConfig ? keyPairConfig.crv : void 0 : void 0;
          return ctx.json({
            keys: keySets.map((keySet) => {
              return {
                alg: keySet.alg ?? options?.jwks?.keyPairConfig?.alg ?? "EdDSA",
                crv: keySet.crv ?? defaultCrv,
                ...JSON.parse(keySet.publicKey),
                kid: keySet.id
              };
            })
          });
        }
      ),
      getToken: createAuthEndpoint(
        "/token",
        {
          method: "GET",
          requireHeaders: true,
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Get a JWT token",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          token: {
                            type: "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const jwt2 = await getJwtToken(ctx, options);
          return ctx.json({
            token: jwt2
          });
        }
      ),
      signJWT: createAuthEndpoint(
        "/sign-jwt",
        {
          method: "POST",
          metadata: {
            SERVER_ONLY: true,
            $Infer: {
              body: {}
            }
          },
          body: z.object({
            payload: z.record(z.string(), z.any()),
            overrideOptions: z.record(z.string(), z.any()).optional()
          })
        },
        async (c) => {
          const jwt2 = await signJWT(c, {
            options: {
              ...options,
              ...c.body.overrideOptions
            },
            payload: c.body.payload
          });
          return c.json({ token: jwt2 });
        }
      )
    },
    hooks: {
      after: [
        {
          matcher(context) {
            return context.path === "/get-session";
          },
          handler: createAuthMiddleware(async (ctx) => {
            if (options?.disableSettingJwtHeader) {
              return;
            }
            const session = ctx.context.session || ctx.context.newSession;
            if (session && session.session) {
              const jwt2 = await getJwtToken(ctx, options);
              const exposedHeaders = ctx.context.responseHeaders?.get(
                "access-control-expose-headers"
              ) || "";
              const headersSet = new Set(
                exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean)
              );
              headersSet.add("set-auth-jwt");
              ctx.setHeader("set-auth-jwt", jwt2);
              ctx.setHeader(
                "Access-Control-Expose-Headers",
                Array.from(headersSet).join(", ")
              );
            }
          })
        }
      ]
    },
    schema: mergeSchema(schema, options?.schema)
  };
};

export { createJwk, getJwtToken, jwt };
