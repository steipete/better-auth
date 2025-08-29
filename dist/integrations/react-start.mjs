import '../shared/better-auth.CMQ3rA-I.mjs';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '../shared/better-auth.BjBlybv-.mjs';
import '@better-auth/utils/binary';
import { p as parseSetCookieHeader } from '../shared/better-auth.DF-MUmVw.mjs';
import 'better-call';
import 'zod/v4';
import { c as createAuthMiddleware } from '../shared/better-auth.BCc3zPBF.mjs';
import '../shared/better-auth.Dk6y9Vrc.mjs';
import '../shared/better-auth.n2KFGwjY.mjs';
import '../shared/better-auth.t7hqTVWt.mjs';
import '../plugins/organization/access/index.mjs';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import 'jose';
import '@noble/hashes/scrypt';
import '@better-auth/utils';
import '@better-auth/utils/hex';
import '@noble/hashes/utils';
import '../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/utils/otp';
import '../plugins/admin/access/index.mjs';
import '@better-fetch/fetch';
import 'zod';
import '../plugins/custom-session/index.mjs';
import '@noble/hashes/sha3';
import '../plugins/device-authorization/index.mjs';
import '../shared/better-auth.DdzSJf-n.mjs';
import '../shared/better-auth.CW6D9eSx.mjs';
import '../shared/better-auth.BZZKN1g7.mjs';
import '../shared/better-auth.CuS_eDdK.mjs';
import '../crypto/index.mjs';
import 'jose/errors';
import '../shared/better-auth.BUPPRXfK.mjs';
import 'defu';
import '../plugins/access/index.mjs';
import '../shared/better-auth.DQI8AD7d.mjs';
import '../shared/better-auth.BpA03GIs.mjs';

const reactStartCookies = () => {
  return {
    id: "react-start-cookies",
    hooks: {
      after: [
        {
          matcher(ctx) {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.responseHeaders;
            if ("_flag" in ctx && ctx._flag === "router") {
              return;
            }
            if (returned instanceof Headers) {
              const setCookies = returned?.get("set-cookie");
              if (!setCookies) return;
              const parsed = parseSetCookieHeader(setCookies);
              const { setCookie } = await import('../chunks/index.mjs');
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
                  setCookie(key, decodeURIComponent(value.value), opts);
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

export { reactStartCookies };
