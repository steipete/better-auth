import { generateKeyPair, exportJWK, importJWK, SignJWT } from 'jose';
import { B as BetterAuthError } from './better-auth.DdzSJf-n.mjs';
import { symmetricEncrypt, symmetricDecrypt } from '../crypto/index.mjs';
import '@better-auth/utils';
import '@better-auth/utils/base64';
import { j as joseSecs } from './better-auth.DF-MUmVw.mjs';

const getJwksAdapter = (adapter) => {
  return {
    getAllKeys: async () => {
      return await adapter.findMany({
        model: "jwks"
      });
    },
    getLatestKey: async () => {
      const key = await adapter.findMany({
        model: "jwks",
        sortBy: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 1
      });
      return key[0];
    },
    createJwk: async (webKey) => {
      const jwk = await adapter.create({
        model: "jwks",
        data: {
          ...webKey,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
      return jwk;
    }
  };
};

function toExpJWT(expirationTime, iat) {
  if (typeof expirationTime === "number") {
    return expirationTime;
  } else if (expirationTime instanceof Date) {
    return Math.floor(expirationTime.getTime() / 1e3);
  } else {
    return iat + joseSecs(expirationTime);
  }
}
async function generateExportedKeyPair(options) {
  const { alg, ...cfg } = options?.jwks?.keyPairConfig ?? {
    alg: "EdDSA",
    crv: "Ed25519"
  };
  const { publicKey, privateKey } = await generateKeyPair(alg, {
    ...cfg,
    extractable: true
  });
  const publicWebKey = await exportJWK(publicKey);
  const privateWebKey = await exportJWK(privateKey);
  return { publicWebKey, privateWebKey, alg, cfg };
}
async function createJwk(ctx, options) {
  const { publicWebKey, privateWebKey, alg, cfg } = await generateExportedKeyPair(options);
  const stringifiedPrivateWebKey = JSON.stringify(privateWebKey);
  const privateKeyEncryptionEnabled = !options?.jwks?.disablePrivateKeyEncryption;
  let jwk = {
    alg,
    ...cfg && "crv" in cfg ? {
      crv: cfg.crv
    } : {},
    publicKey: JSON.stringify(publicWebKey),
    privateKey: privateKeyEncryptionEnabled ? JSON.stringify(
      await symmetricEncrypt({
        key: ctx.context.secret,
        data: stringifiedPrivateWebKey
      })
    ) : stringifiedPrivateWebKey,
    createdAt: /* @__PURE__ */ new Date()
  };
  const adapter = getJwksAdapter(ctx.context.adapter);
  const key = await adapter.createJwk(jwk);
  return key;
}

async function signJWT(ctx, config) {
  const { options, payload } = config;
  const nowSeconds = Math.floor(Date.now() / 1e3);
  const iat = payload.iat;
  let exp = payload.exp;
  const defaultExp = toExpJWT(
    options?.jwt?.expirationTime ?? "15m",
    iat ?? nowSeconds
  );
  exp = exp ?? defaultExp;
  const nbf = payload.nbf;
  const iss = payload.iss;
  const defaultIss = options?.jwt?.issuer ?? ctx.context.options.baseURL;
  const aud = payload.aud;
  const defaultAud = options?.jwt?.audience ?? ctx.context.options.baseURL;
  if (options?.jwt?.sign) {
    const jwtPayload = {
      ...payload,
      iat,
      exp,
      nbf,
      iss: iss ?? defaultIss,
      aud: aud ?? defaultAud
    };
    return options.jwt.sign(jwtPayload);
  }
  const adapter = getJwksAdapter(ctx.context.adapter);
  let key = await adapter.getLatestKey();
  const privateKeyEncryptionEnabled = !options?.jwks?.disablePrivateKeyEncryption;
  if (key === void 0) {
    key = await createJwk(ctx, options);
  }
  let privateWebKey = privateKeyEncryptionEnabled ? await symmetricDecrypt({
    key: ctx.context.secret,
    data: JSON.parse(key.privateKey)
  }).catch(() => {
    throw new BetterAuthError(
      "Failed to decrypt private private key. Make sure the secret currently in use is the same as the one used to encrypt the private key. If you are using a different secret, either cleanup your jwks or disable private key encryption."
    );
  }) : key.privateKey;
  const alg = key.alg ?? options?.jwks?.keyPairConfig?.alg ?? "EdDSA";
  const privateKey = await importJWK(JSON.parse(privateWebKey), alg);
  const jwt = new SignJWT(payload).setProtectedHeader({
    alg,
    kid: key.id
  }).setExpirationTime(exp).setIssuer(iss ?? defaultIss).setAudience(aud ?? defaultAud);
  if (iat) jwt.setIssuedAt(iat);
  if (payload.sub) jwt.setSubject(payload.sub);
  if (payload.nbf) jwt.setNotBefore(payload.nbf);
  if (payload.jti) jwt.setJti(payload.jti);
  return await jwt.sign(privateKey);
}
async function getJwtToken(ctx, options) {
  const payload = !options?.jwt?.definePayload ? ctx.context.session.user : await options?.jwt.definePayload(ctx.context.session);
  return await signJWT(ctx, {
    options,
    payload: {
      ...payload,
      sub: await options?.jwt?.getSubject?.(ctx.context.session) ?? ctx.context.session.user.id
    }
  });
}

export { generateExportedKeyPair as a, getJwksAdapter as b, createJwk as c, getJwtToken as g, signJWT as s };
