'use strict';

const betterCall = require('better-call');
require('../../shared/better-auth.B6fIklBU.cjs');
require('@better-auth/utils/base64');
const hmac = require('@better-auth/utils/hmac');
require('../../shared/better-auth.B3274wGK.cjs');
require('@better-auth/utils/binary');
const cookies_index = require('../../shared/better-auth.l2-e84v_.cjs');
require('../../shared/better-auth.Dg3Pwtlb.cjs');
const session = require('../../shared/better-auth.Bco357J8.cjs');
require('zod/v4');
require('../../shared/better-auth.BIMq4RPW.cjs');
require('../../shared/better-auth.ANpbi45u.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.vPQBmXQL.cjs');
require('../../shared/better-auth.DRmln2Nr.cjs');
require('@better-auth/utils/hash');
require('../../crypto/index.cjs');
require('@noble/ciphers/chacha');
require('@noble/ciphers/utils');
require('@noble/ciphers/webcrypto');
require('jose');
require('@noble/hashes/scrypt');
require('@better-auth/utils');
require('@better-auth/utils/hex');
require('@noble/hashes/utils');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('@better-auth/utils/random');
require('@better-fetch/fetch');
require('jose/errors');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('defu');

const bearer = (options) => {
  return {
    id: "bearer",
    hooks: {
      before: [
        {
          matcher(context) {
            return Boolean(
              context.request?.headers.get("authorization") || context.headers?.get("authorization")
            );
          },
          handler: session.createAuthMiddleware(async (c) => {
            const token = c.request?.headers.get("authorization")?.replace("Bearer ", "") || c.headers?.get("Authorization")?.replace("Bearer ", "");
            if (!token) {
              return;
            }
            let signedToken = "";
            if (token.includes(".")) {
              signedToken = token.replace("=", "");
            } else {
              if (options?.requireSignature) {
                return;
              }
              signedToken = (await betterCall.serializeSignedCookie("", token, c.context.secret)).replace("=", "");
            }
            try {
              const decodedToken = decodeURIComponent(signedToken);
              const isValid = await hmac.createHMAC(
                "SHA-256",
                "base64urlnopad"
              ).verify(
                c.context.secret,
                decodedToken.split(".")[0],
                decodedToken.split(".")[1]
              );
              if (!isValid) {
                return;
              }
            } catch (e) {
              return;
            }
            const existingHeaders = c.request?.headers || c.headers;
            const headers = new Headers({
              ...Object.fromEntries(existingHeaders?.entries())
            });
            headers.append(
              "cookie",
              `${c.context.authCookies.sessionToken.name}=${signedToken}`
            );
            return {
              context: {
                headers
              }
            };
          })
        }
      ],
      after: [
        {
          matcher(context) {
            return true;
          },
          handler: session.createAuthMiddleware(async (ctx) => {
            const setCookie = ctx.context.responseHeaders?.get("set-cookie");
            if (!setCookie) {
              return;
            }
            const parsedCookies = cookies_index.parseSetCookieHeader(setCookie);
            const cookieName = ctx.context.authCookies.sessionToken.name;
            const sessionCookie = parsedCookies.get(cookieName);
            if (!sessionCookie || !sessionCookie.value || sessionCookie["max-age"] === 0) {
              return;
            }
            const token = sessionCookie.value;
            const exposedHeaders = ctx.context.responseHeaders?.get(
              "access-control-expose-headers"
            ) || "";
            const headersSet = new Set(
              exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean)
            );
            headersSet.add("set-auth-token");
            ctx.setHeader("set-auth-token", token);
            ctx.setHeader(
              "Access-Control-Expose-Headers",
              Array.from(headersSet).join(", ")
            );
          })
        }
      ]
    }
  };
};

exports.bearer = bearer;
