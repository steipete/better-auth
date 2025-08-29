'use strict';

require('../shared/better-auth.B6fIklBU.cjs');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('../shared/better-auth.B3274wGK.cjs');
require('@better-auth/utils/binary');
const cookies_index = require('../shared/better-auth.l2-e84v_.cjs');
require('better-call');
require('zod/v4');
const session = require('../shared/better-auth.Bco357J8.cjs');
require('../shared/better-auth.Dg3Pwtlb.cjs');
require('../shared/better-auth.BIMq4RPW.cjs');
require('../shared/better-auth.BLGihQrN.cjs');
require('../plugins/organization/access/index.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha');
require('@noble/ciphers/utils');
require('@noble/ciphers/webcrypto');
require('jose');
require('@noble/hashes/scrypt');
require('@better-auth/utils');
require('@better-auth/utils/hex');
require('@noble/hashes/utils');
require('../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/utils/otp');
require('../plugins/admin/access/index.cjs');
require('@better-fetch/fetch');
require('zod');
require('../plugins/custom-session/index.cjs');
require('@noble/hashes/sha3');
require('../plugins/device-authorization/index.cjs');
require('../shared/better-auth.ANpbi45u.cjs');
require('../shared/better-auth.C1hdVENX.cjs');
require('../shared/better-auth.vPQBmXQL.cjs');
require('../shared/better-auth.DRmln2Nr.cjs');
require('../crypto/index.cjs');
require('jose/errors');
require('../shared/better-auth.Bg6iw3ig.cjs');
require('defu');
require('../plugins/access/index.cjs');
require('../shared/better-auth.DNqtHmvg.cjs');
require('../shared/better-auth.BMgeJg3r.cjs');

function toNextJsHandler(auth) {
  const handler = async (request) => {
    return "handler" in auth ? auth.handler(request) : auth(request);
  };
  return {
    GET: handler,
    POST: handler
  };
}
const nextCookies = () => {
  return {
    id: "next-cookies",
    hooks: {
      after: [
        {
          matcher(ctx) {
            return true;
          },
          handler: session.createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.responseHeaders;
            if ("_flag" in ctx && ctx._flag === "router") {
              return;
            }
            if (returned instanceof Headers) {
              const setCookies = returned?.get("set-cookie");
              if (!setCookies) return;
              const parsed = cookies_index.parseSetCookieHeader(setCookies);
              const { cookies } = await import('next/headers');
              let cookieHelper;
              try {
                cookieHelper = await cookies();
              } catch (error) {
                if (error instanceof Error && error.message.startsWith(
                  "`cookies` was called outside a request scope."
                )) {
                  return;
                }
                throw error;
              }
              parsed.forEach((value, key) => {
                if (!key) return;
                const opts = {
                  sameSite: value.samesite,
                  secure: value.secure,
                  maxAge: value["max-age"],
                  httpOnly: value.httponly,
                  domain: value.domain,
                  path: value.path
                };
                try {
                  cookieHelper.set(key, decodeURIComponent(value.value), opts);
                } catch (e) {
                }
              });
              return;
            }
          })
        }
      ]
    }
  };
};

exports.nextCookies = nextCookies;
exports.toNextJsHandler = toNextJsHandler;
