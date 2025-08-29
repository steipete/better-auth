import { P as ProviderOptions, O as OAuth2Tokens } from '../shared/better-auth.XX3IEFux.mjs';
export { a as OAuth2UserInfo, b as OAuthProvider } from '../shared/better-auth.XX3IEFux.mjs';
import * as jose from 'jose';
import { p as AuthContext, G as GenericEndpointContext, U as User, O as Account } from '../shared/better-auth.6m9muJRT.mjs';
export { g as generateState, p as parseState } from '../shared/better-auth.B1bm2XUZ.mjs';
import '../shared/better-auth.DTtXpZYr.mjs';
import 'zod/v4';
import 'kysely';
import 'better-call';
import 'zod/v4/core';
import 'zod';

declare function createAuthorizationURL({ id, options, authorizationEndpoint, state, codeVerifier, scopes, claims, redirectURI, duration, prompt, accessType, responseType, display, loginHint, hd, responseMode, additionalParams, scopeJoiner, }: {
    id: string;
    options: ProviderOptions;
    redirectURI: string;
    authorizationEndpoint: string;
    state: string;
    codeVerifier?: string;
    scopes: string[];
    claims?: string[];
    duration?: string;
    prompt?: string;
    accessType?: string;
    responseType?: string;
    display?: string;
    loginHint?: string;
    hd?: string;
    responseMode?: string;
    additionalParams?: Record<string, string>;
    scopeJoiner?: string;
}): Promise<URL>;

declare function createAuthorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, deviceId, headers, additionalParams, resource, }: {
    code: string;
    redirectURI: string;
    options: Partial<ProviderOptions>;
    codeVerifier?: string;
    deviceId?: string;
    authentication?: "basic" | "post";
    headers?: Record<string, string>;
    additionalParams?: Record<string, string>;
    resource?: string | string[];
}): {
    body: URLSearchParams;
    headers: Record<string, any>;
};
declare function validateAuthorizationCode({ code, codeVerifier, redirectURI, options, tokenEndpoint, authentication, deviceId, headers, additionalParams, resource, }: {
    code: string;
    redirectURI: string;
    options: Partial<ProviderOptions>;
    codeVerifier?: string;
    deviceId?: string;
    tokenEndpoint: string;
    authentication?: "basic" | "post";
    headers?: Record<string, string>;
    additionalParams?: Record<string, string>;
    resource?: string | string[];
}): Promise<OAuth2Tokens>;
declare function validateToken(token: string, jwksEndpoint: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>>;

declare function createRefreshAccessTokenRequest({ refreshToken, options, authentication, extraParams, resource, }: {
    refreshToken: string;
    options: Partial<ProviderOptions>;
    authentication?: "basic" | "post";
    extraParams?: Record<string, string>;
    resource?: string | string[];
}): {
    body: URLSearchParams;
    headers: Record<string, any>;
};
declare function refreshAccessToken({ refreshToken, options, tokenEndpoint, authentication, extraParams, }: {
    refreshToken: string;
    options: Partial<ProviderOptions>;
    tokenEndpoint: string;
    authentication?: "basic" | "post";
    extraParams?: Record<string, string>;
    /** @deprecated always "refresh_token" */
    grantType?: string;
}): Promise<OAuth2Tokens>;

declare function generateCodeChallenge(codeVerifier: string): Promise<string>;
declare function getOAuth2Tokens(data: Record<string, any>): OAuth2Tokens;
declare const encodeOAuthParameter: (value: string) => string;
declare function decryptOAuthToken(token: string, ctx: AuthContext): string | Promise<string>;
declare function setTokenUtil(token: string | null | undefined, ctx: AuthContext): string | Promise<string> | null | undefined;

declare function handleOAuthUserInfo(c: GenericEndpointContext, { userInfo, account, callbackURL, disableSignUp, overrideUserInfo, }: {
    userInfo: Omit<User, "createdAt" | "updatedAt">;
    account: Omit<Account, "id" | "userId" | "createdAt" | "updatedAt">;
    callbackURL?: string;
    disableSignUp?: boolean;
    overrideUserInfo?: boolean;
}): Promise<{
    error: string;
    data: null;
    isRegister?: undefined;
} | {
    error: string;
    data: null;
    isRegister: boolean;
} | {
    data: {
        session: {
            id: string;
            userId: string;
            expiresAt: Date;
            createdAt: Date;
            updatedAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined;
        };
    };
    error: null;
    isRegister: boolean;
}>;

export { OAuth2Tokens, ProviderOptions, createAuthorizationCodeRequest, createAuthorizationURL, createRefreshAccessTokenRequest, decryptOAuthToken, encodeOAuthParameter, generateCodeChallenge, getOAuth2Tokens, handleOAuthUserInfo, refreshAccessToken, setTokenUtil, validateAuthorizationCode, validateToken };
