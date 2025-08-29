'use strict';

const z = require('zod/v4');
const betterCall = require('better-call');
const session = require('../../shared/better-auth.Bco357J8.cjs');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha');
require('@noble/ciphers/utils');
require('@noble/ciphers/webcrypto');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt');
const utils = require('@better-auth/utils');
require('@better-auth/utils/hex');
require('@noble/hashes/utils');
const random = require('../../shared/better-auth.CYeOI8C-.cjs');
const schema$1 = require('../../shared/better-auth.BIMq4RPW.cjs');
require('../../shared/better-auth.B6fIklBU.cjs');
require('../../shared/better-auth.B3274wGK.cjs');
require('@better-auth/utils/random');
require('kysely');
const client = require('../../shared/better-auth.BMgeJg3r.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.l2-e84v_.cjs');
require('../../shared/better-auth.ANpbi45u.cjs');
require('@better-auth/utils/hmac');
require('../../shared/better-auth.vPQBmXQL.cjs');
require('../../shared/better-auth.DRmln2Nr.cjs');
require('@better-auth/utils/binary');

function _interopNamespaceCompat(e) {
	if (e && typeof e === 'object' && 'default' in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const z__namespace = /*#__PURE__*/_interopNamespaceCompat(z);

const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
function ms(value, options) {
  if (typeof value === "string") {
    return parse(value);
  } else if (typeof value === "number") {
    return format(value);
  }
  throw new Error(
    `Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`
  );
}
function parse(str) {
  if (typeof str !== "string" || str.length === 0 || str.length > 100) {
    throw new Error(
      `Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`
    );
  }
  const match = /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match?.groups) {
    return NaN;
  }
  const { value, unit = "ms" } = match.groups;
  const n = parseFloat(value);
  const matchUnit = unit.toLowerCase();
  switch (matchUnit) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      throw new Error(
        `Unknown unit "${matchUnit}" provided to ms.parse(). value=${JSON.stringify(str)}`
      );
  }
}
function fmtShort(ms2) {
  const msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return `${Math.round(ms2 / d)}d`;
  }
  if (msAbs >= h) {
    return `${Math.round(ms2 / h)}h`;
  }
  if (msAbs >= m) {
    return `${Math.round(ms2 / m)}m`;
  }
  if (msAbs >= s) {
    return `${Math.round(ms2 / s)}s`;
  }
  return `${ms2}ms`;
}
function format(ms2, options) {
  if (typeof ms2 !== "number" || !Number.isFinite(ms2)) {
    throw new Error("Value provided to ms.format() must be of type number.");
  }
  return fmtShort(ms2);
}

const schema = {
  deviceCode: {
    fields: {
      deviceCode: {
        type: "string",
        required: true
      },
      userCode: {
        type: "string",
        required: true
      },
      userId: {
        type: "string",
        required: false
      },
      expiresAt: {
        type: "date",
        required: true
      },
      status: {
        type: "string",
        required: true
      },
      lastPolledAt: {
        type: "date",
        required: false
      },
      pollingInterval: {
        type: "number",
        required: false
      },
      clientId: {
        type: "string",
        required: false
      },
      scope: {
        type: "string",
        required: false
      }
    }
  }
};
z__namespace.object({
  id: z__namespace.string(),
  deviceCode: z__namespace.string(),
  userCode: z__namespace.string(),
  userId: z__namespace.string().optional(),
  expiresAt: z__namespace.date(),
  status: z__namespace.string(),
  lastPolledAt: z__namespace.date().optional(),
  pollingInterval: z__namespace.number().optional(),
  clientId: z__namespace.string().optional(),
  scope: z__namespace.string().optional()
});

const msStringValueSchema = z.z.custom(
  (val) => {
    try {
      ms(val);
    } catch (e) {
      return false;
    }
    return true;
  },
  {
    message: "Invalid time string format. Use formats like '30m', '5s', '1h', etc."
  }
);
const $deviceAuthorizationOptionsSchema = z.z.object({
  expiresIn: msStringValueSchema.default("30m").describe(
    "Time in seconds until the device code expires. Use formats like '30m', '5s', '1h', etc."
  ),
  interval: msStringValueSchema.default("5s").describe(
    "Time in seconds between polling attempts. Use formats like '30m', '5s', '1h', etc."
  ),
  deviceCodeLength: z.z.number().int().positive().default(40).describe(
    "Length of the device code to be generated. Default is 40 characters."
  ),
  userCodeLength: z.z.number().int().positive().default(8).describe(
    "Length of the user code to be generated. Default is 8 characters."
  ),
  generateDeviceCode: z.z.custom(
    (val) => typeof val === "function",
    {
      message: "generateDeviceCode must be a function that returns a string or a promise that resolves to a string."
    }
  ).optional().describe(
    "Function to generate a device code. If not provided, a default random string generator will be used."
  ),
  generateUserCode: z.z.custom(
    (val) => typeof val === "function",
    {
      message: "generateUserCode must be a function that returns a string or a promise that resolves to a string."
    }
  ).optional().describe(
    "Function to generate a user code. If not provided, a default random string generator will be used."
  ),
  validateClient: z.z.custom(
    (val) => typeof val === "function",
    {
      message: "validateClient must be a function that returns a boolean or a promise that resolves to a boolean."
    }
  ).optional().describe(
    "Function to validate the client ID. If not provided, no validation will be performed."
  ),
  onDeviceAuthRequest: z.z.custom((val) => typeof val === "function", {
    message: "onDeviceAuthRequest must be a function that returns void or a promise that resolves to void."
  }).optional().describe(
    "Function to handle device authorization requests. If not provided, no additional actions will be taken."
  ),
  schema: z.z.custom(() => true)
});
const DEVICE_AUTHORIZATION_ERROR_CODES = {
  INVALID_DEVICE_CODE: "Invalid device code",
  EXPIRED_DEVICE_CODE: "Device code has expired",
  EXPIRED_USER_CODE: "User code has expired",
  AUTHORIZATION_PENDING: "Authorization pending",
  ACCESS_DENIED: "Access denied",
  INVALID_USER_CODE: "Invalid user code",
  DEVICE_CODE_ALREADY_PROCESSED: "Device code already processed",
  POLLING_TOO_FREQUENTLY: "Polling too frequently",
  USER_NOT_FOUND: "User not found",
  FAILED_TO_CREATE_SESSION: "Failed to create session",
  INVALID_DEVICE_CODE_STATUS: "Invalid device code status",
  AUTHENTICATION_REQUIRED: "Authentication required"
};
const defaultCharset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const defaultGenerateDeviceCode = (length) => {
  return random.generateRandomString(length, "a-z", "A-Z", "0-9");
};
const defaultGenerateUserCode = (length) => {
  const chars = new Uint8Array(length);
  return Array.from(utils.getRandomValues(chars)).map((byte) => defaultCharset[byte % defaultCharset.length]).join("");
};
const deviceAuthorization = (options = {}) => {
  const opts = $deviceAuthorizationOptionsSchema.parse(options);
  const generateDeviceCode = async () => {
    if (opts.generateDeviceCode) {
      return opts.generateDeviceCode();
    }
    return defaultGenerateDeviceCode(opts.deviceCodeLength);
  };
  const generateUserCode = async () => {
    if (opts.generateUserCode) {
      return opts.generateUserCode();
    }
    return defaultGenerateUserCode(opts.userCodeLength);
  };
  return {
    id: "device-authorization",
    schema: schema$1.mergeSchema(schema, options?.schema),
    endpoints: {
      deviceCode: session.createAuthEndpoint(
        "/device/code",
        {
          method: "POST",
          body: z.z.object({
            client_id: z.z.string().meta({
              description: "The client ID of the application"
            }),
            scope: z.z.string().meta({
              description: "Space-separated list of scopes"
            }).optional()
          }),
          error: z.z.object({
            error: z.z.enum(["invalid_request", "invalid_client"]).meta({
              description: "Error code"
            }),
            error_description: z.z.string().meta({
              description: "Detailed error description"
            })
          }),
          metadata: {
            openapi: {
              description: `Request a device and user code

Follow [rfc8628#section-3.2](https://datatracker.ietf.org/doc/html/rfc8628#section-3.2)`,
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          device_code: {
                            type: "string",
                            description: "The device verification code"
                          },
                          user_code: {
                            type: "string",
                            description: "The user code to display"
                          },
                          verification_uri: {
                            type: "string",
                            description: "The URL for user verification"
                          },
                          verification_uri_complete: {
                            type: "string",
                            description: "The complete URL with user code"
                          },
                          expires_in: {
                            type: "number",
                            description: "Lifetime in seconds of the device code"
                          },
                          interval: {
                            type: "number",
                            description: "Minimum polling interval in seconds"
                          }
                        }
                      }
                    }
                  }
                },
                400: {
                  description: "Error response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          error: {
                            type: "string",
                            enum: ["invalid_request", "invalid_client"]
                          },
                          error_description: {
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
          if (opts.validateClient) {
            const isValid = await opts.validateClient(ctx.body.client_id);
            if (!isValid) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error: "invalid_client",
                error_description: "Invalid client ID"
              });
            }
          }
          if (opts.onDeviceAuthRequest) {
            await opts.onDeviceAuthRequest(ctx.body.client_id, ctx.body.scope);
          }
          const deviceCode = await generateDeviceCode();
          const userCode = await generateUserCode();
          const expiresIn = ms(opts.expiresIn);
          const expiresAt = new Date(Date.now() + expiresIn);
          await ctx.context.adapter.create({
            model: "deviceCode",
            data: {
              deviceCode,
              userCode,
              expiresAt,
              status: "pending",
              pollingInterval: ms(opts.interval),
              clientId: ctx.body.client_id,
              scope: ctx.body.scope
            }
          });
          const baseURL = new URL(ctx.context.baseURL);
          const verification_uri = new URL("/device", baseURL);
          const verification_uri_complete = new URL(verification_uri);
          verification_uri_complete.searchParams.set(
            "user_code",
            // should we support custom formatting function here?
            encodeURIComponent(userCode)
          );
          return ctx.json(
            {
              device_code: deviceCode,
              user_code: userCode,
              verification_uri: verification_uri.toString(),
              verification_uri_complete: verification_uri_complete.toString(),
              expires_in: Math.floor(expiresIn / 1e3),
              interval: Math.floor(ms(opts.interval) / 1e3)
            },
            {
              headers: {
                "Cache-Control": "no-store"
              }
            }
          );
        }
      ),
      deviceToken: session.createAuthEndpoint(
        "/device/token",
        {
          method: "POST",
          body: z.z.object({
            grant_type: z.z.literal("urn:ietf:params:oauth:grant-type:device_code").meta({
              description: "The grant type for device flow"
            }),
            device_code: z.z.string().meta({
              description: "The device verification code"
            }),
            client_id: z.z.string().meta({
              description: "The client ID of the application"
            })
          }),
          error: z.z.object({
            error: z.z.enum([
              "authorization_pending",
              "slow_down",
              "expired_token",
              "access_denied",
              "invalid_request",
              "invalid_grant"
            ]).meta({
              description: "Error code"
            }),
            error_description: z.z.string().meta({
              description: "Detailed error description"
            })
          }),
          metadata: {
            openapi: {
              description: `Exchange device code for access token

Follow [rfc8628#section-3.4](https://datatracker.ietf.org/doc/html/rfc8628#section-3.4)`,
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          session: {
                            $ref: "#/components/schemas/Session"
                          },
                          user: {
                            $ref: "#/components/schemas/User"
                          }
                        }
                      }
                    }
                  }
                },
                400: {
                  description: "Error response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          error: {
                            type: "string",
                            enum: [
                              "authorization_pending",
                              "slow_down",
                              "expired_token",
                              "access_denied",
                              "invalid_request",
                              "invalid_grant"
                            ]
                          },
                          error_description: {
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
          const { device_code, client_id } = ctx.body;
          if (opts.validateClient) {
            const isValid = await opts.validateClient(client_id);
            if (!isValid) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error: "invalid_grant",
                error_description: "Invalid client ID"
              });
            }
          }
          const deviceCodeRecord = await ctx.context.adapter.findOne({
            model: "deviceCode",
            where: [
              {
                field: "deviceCode",
                value: device_code
              }
            ]
          });
          if (!deviceCodeRecord) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_grant",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_DEVICE_CODE
            });
          }
          if (deviceCodeRecord.clientId && deviceCodeRecord.clientId !== client_id) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_grant",
              error_description: "Client ID mismatch"
            });
          }
          if (deviceCodeRecord.lastPolledAt && deviceCodeRecord.pollingInterval) {
            const timeSinceLastPoll = Date.now() - new Date(deviceCodeRecord.lastPolledAt).getTime();
            const minInterval = deviceCodeRecord.pollingInterval;
            if (timeSinceLastPoll < minInterval) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error: "slow_down",
                error_description: DEVICE_AUTHORIZATION_ERROR_CODES.POLLING_TOO_FREQUENTLY
              });
            }
          }
          await ctx.context.adapter.update({
            model: "deviceCode",
            where: [
              {
                field: "id",
                value: deviceCodeRecord.id
              }
            ],
            update: {
              lastPolledAt: /* @__PURE__ */ new Date()
            }
          });
          if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) {
            await ctx.context.adapter.delete({
              model: "deviceCode",
              where: [
                {
                  field: "id",
                  value: deviceCodeRecord.id
                }
              ]
            });
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "expired_token",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_DEVICE_CODE
            });
          }
          if (deviceCodeRecord.status === "pending") {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "authorization_pending",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHORIZATION_PENDING
            });
          }
          if (deviceCodeRecord.status === "denied") {
            await ctx.context.adapter.delete({
              model: "deviceCode",
              where: [
                {
                  field: "id",
                  value: deviceCodeRecord.id
                }
              ]
            });
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "access_denied",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.ACCESS_DENIED
            });
          }
          if (deviceCodeRecord.status === "approved" && deviceCodeRecord.userId) {
            await ctx.context.adapter.delete({
              model: "deviceCode",
              where: [
                {
                  field: "id",
                  value: deviceCodeRecord.id
                }
              ]
            });
            const user = await ctx.context.internalAdapter.findUserById(
              deviceCodeRecord.userId
            );
            if (!user) {
              throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
                error: "server_error",
                error_description: DEVICE_AUTHORIZATION_ERROR_CODES.USER_NOT_FOUND
              });
            }
            const session = await ctx.context.internalAdapter.createSession(
              user.id,
              ctx
            );
            if (!session) {
              throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
                error: "server_error",
                error_description: DEVICE_AUTHORIZATION_ERROR_CODES.FAILED_TO_CREATE_SESSION
              });
            }
            return ctx.json(
              {
                access_token: session.token,
                token_type: "Bearer",
                expires_in: Math.floor(
                  (new Date(session.expiresAt).getTime() - Date.now()) / 1e3
                ),
                scope: deviceCodeRecord.scope || ""
              },
              {
                headers: {
                  "Cache-Control": "no-store",
                  Pragma: "no-cache"
                }
              }
            );
          }
          throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
            error: "server_error",
            error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_DEVICE_CODE_STATUS
          });
        }
      ),
      deviceVerify: session.createAuthEndpoint(
        "/device",
        {
          method: "GET",
          query: z.z.object({
            user_code: z.z.string().meta({
              description: "The user code to verify"
            })
          }),
          error: z.z.object({
            error: z.z.enum(["invalid_request"]).meta({
              description: "Error code"
            }),
            error_description: z.z.string().meta({
              description: "Detailed error description"
            })
          }),
          metadata: {
            openapi: {
              description: "Display device verification page",
              responses: {
                200: {
                  description: "Verification page HTML",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user_code: {
                            type: "string",
                            description: "The user code to verify"
                          },
                          status: {
                            type: "string",
                            enum: ["pending", "approved", "denied"],
                            description: "Current status of the device authorization"
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
          const { user_code } = ctx.query;
          const cleanUserCode = user_code.replace(/-/g, "");
          const deviceCodeRecord = await ctx.context.adapter.findOne({
            model: "deviceCode",
            where: [
              {
                field: "userCode",
                value: cleanUserCode
              }
            ]
          });
          if (!deviceCodeRecord) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_request",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
            });
          }
          if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "expired_token",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
            });
          }
          return ctx.json({
            user_code,
            status: deviceCodeRecord.status
          });
        }
      ),
      deviceApprove: session.createAuthEndpoint(
        "/device/approve",
        {
          method: "POST",
          body: z.z.object({
            userCode: z.z.string().meta({
              description: "The user code to approve"
            })
          }),
          error: z.z.object({
            error: z.z.enum([
              "invalid_request",
              "expired_token",
              "device_code_already_processed"
            ]).meta({
              description: "Error code"
            }),
            error_description: z.z.string().meta({
              description: "Detailed error description"
            })
          }),
          requireHeaders: true,
          metadata: {
            openapi: {
              description: "Approve device authorization",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean"
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
          const session$1 = await session.getSessionFromCtx(ctx);
          if (!session$1) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error: "unauthorized",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHENTICATION_REQUIRED
            });
          }
          const { userCode } = ctx.body;
          const deviceCodeRecord = await ctx.context.adapter.findOne({
            model: "deviceCode",
            where: [
              {
                field: "userCode",
                value: userCode
              }
            ]
          });
          if (!deviceCodeRecord) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_request",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
            });
          }
          if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "expired_token",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
            });
          }
          if (deviceCodeRecord.status !== "pending") {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_request",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
            });
          }
          await ctx.context.adapter.update({
            model: "deviceCode",
            where: [
              {
                field: "id",
                value: deviceCodeRecord.id
              }
            ],
            update: {
              status: "approved",
              userId: session$1.user.id
            }
          });
          return ctx.json({
            success: true
          });
        }
      ),
      deviceDeny: session.createAuthEndpoint(
        "/device/deny",
        {
          method: "POST",
          body: z.z.object({
            userCode: z.z.string().meta({
              description: "The user code to deny"
            })
          }),
          metadata: {
            openapi: {
              description: "Deny device authorization",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean"
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
          const { userCode } = ctx.body;
          const cleanUserCode = userCode.replace(/-/g, "");
          const deviceCodeRecord = await ctx.context.adapter.findOne({
            model: "deviceCode",
            where: [
              {
                field: "userCode",
                value: cleanUserCode
              }
            ]
          });
          if (!deviceCodeRecord) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_request",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
            });
          }
          if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "expired_token",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
            });
          }
          if (deviceCodeRecord.status !== "pending") {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_request",
              error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
            });
          }
          await ctx.context.adapter.update({
            model: "deviceCode",
            where: [
              {
                field: "id",
                value: deviceCodeRecord.id
              }
            ],
            update: {
              status: "denied"
            }
          });
          return ctx.json({
            success: true
          });
        }
      )
    },
    $ERROR_CODES: DEVICE_AUTHORIZATION_ERROR_CODES
  };
};

exports.deviceAuthorizationClient = client.deviceAuthorizationClient;
exports.$deviceAuthorizationOptionsSchema = $deviceAuthorizationOptionsSchema;
exports.deviceAuthorization = deviceAuthorization;
