'use strict';

const sign = require('../../shared/better-auth.AeIHgLBF.cjs');
const betterCall = require('better-call');
require('../../shared/better-auth.Dg3Pwtlb.cjs');
const session = require('../../shared/better-auth.Bco357J8.cjs');
require('zod/v4');
const index = require('../../shared/better-auth.ANpbi45u.cjs');
require('../../shared/better-auth.B6fIklBU.cjs');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('../../shared/better-auth.B3274wGK.cjs');
require('@better-auth/utils/binary');
const schema$1 = require('../../shared/better-auth.BIMq4RPW.cjs');
const z = require('zod');
require('jose');
require('../../crypto/index.cjs');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha');
require('@noble/ciphers/utils');
require('@noble/ciphers/webcrypto');
require('@noble/hashes/scrypt');
require('@better-auth/utils');
require('@better-auth/utils/hex');
require('@noble/hashes/utils');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('@better-auth/utils/random');
require('../../shared/better-auth.l2-e84v_.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.vPQBmXQL.cjs');
require('../../shared/better-auth.DRmln2Nr.cjs');
require('@better-fetch/fetch');
require('jose/errors');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('defu');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const z__default = /*#__PURE__*/_interopDefaultCompat(z);

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
    throw new index.BetterAuthError(
      "jwks_config",
      "jwks.remoteUrl must be set when using jwt.sign"
    );
  }
  if (options?.jwks?.remoteUrl && !options.jwks?.keyPairConfig?.alg) {
    throw new index.BetterAuthError(
      "jwks_config",
      "must specify alg when using the oidc plugin and jwks.remoteUrl"
    );
  }
  return {
    id: "jwt",
    options,
    endpoints: {
      getJwks: session.createAuthEndpoint(
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
            throw new betterCall.APIError("NOT_FOUND");
          }
          const adapter = sign.getJwksAdapter(ctx.context.adapter);
          const keySets = await adapter.getAllKeys();
          if (keySets.length === 0) {
            const key = await sign.createJwk(ctx, options);
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
      getToken: session.createAuthEndpoint(
        "/token",
        {
          method: "GET",
          requireHeaders: true,
          use: [session.sessionMiddleware],
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
          const jwt2 = await sign.getJwtToken(ctx, options);
          return ctx.json({
            token: jwt2
          });
        }
      ),
      signJWT: session.createAuthEndpoint(
        "/sign-jwt",
        {
          method: "POST",
          metadata: {
            SERVER_ONLY: true,
            $Infer: {
              body: {}
            }
          },
          body: z__default.object({
            payload: z__default.record(z__default.string(), z__default.any()),
            overrideOptions: z__default.record(z__default.string(), z__default.any()).optional()
          })
        },
        async (c) => {
          const jwt2 = await sign.signJWT(c, {
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
          handler: session.createAuthMiddleware(async (ctx) => {
            if (options?.disableSettingJwtHeader) {
              return;
            }
            const session = ctx.context.session || ctx.context.newSession;
            if (session && session.session) {
              const jwt2 = await sign.getJwtToken(ctx, options);
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
    schema: schema$1.mergeSchema(schema, options?.schema)
  };
};

exports.createJwk = sign.createJwk;
exports.generateExportedKeyPair = sign.generateExportedKeyPair;
exports.getJwtToken = sign.getJwtToken;
exports.jwt = jwt;
