import { B as BetterAuthOptions, T as TelemetryContext, t as TelemetryEvent, F as FieldAttribute, M as Models } from './shared/better-auth.BH8RNaDG.mjs';
export { D as Account, a as Adapter, N as AdapterInstance, L as AdapterSchemaCreation, x as AdditionalSessionFieldsInput, y as AdditionalSessionFieldsOutput, v as AdditionalUserFieldsInput, w as AdditionalUserFieldsOutput, n as Auth, p as AuthContext, g as AuthPluginSchema, h as BetterAuthPlugin, Q as FilterActions, P as FilteredAPI, G as GenericEndpointContext, H as HookEndpointContext, Y as InferAPI, I as InferOptionSchema, i as InferPluginErrorCodes, z as InferPluginTypes, r as InferSession, X as InferSessionAPI, q as InferUser, a2 as InternalLogger, a1 as LogHandlerParams, Z as LogLevel, a0 as Logger, R as RateLimit, O as SecondaryStorage, S as Session, U as User, V as Verification, J as Where, W as WithJsDoc, u as betterAuth, a3 as createLogger, E as init, _ as levels, a4 as logger, $ as shouldPublishLog } from './shared/better-auth.BH8RNaDG.mjs';
export { AtomListener, BetterAuthClientPlugin, ClientOptions, InferActions, InferAdditionalFromClient, InferClientAPI, InferErrorCodes, InferPluginsFromClient, InferSessionFromClient, InferUserFromClient, IsSignal, Store } from './types/index.mjs';
export { H as HIDE_METADATA } from './shared/better-auth.DEHJp1rk.mjs';
export { g as generateState, p as parseState } from './shared/better-auth.CIpM6H0d.mjs';
export * from 'better-call';
export * from 'zod/v4';
export * from 'zod/v4/core';
import { a as LiteralUnion } from './shared/better-auth.D9UKno48.mjs';
export { A as Awaitable, D as DeepPartial, E as Expand, H as HasRequiredKeys, c as LiteralNumber, L as LiteralString, O as OmitId, e as PreserveJSDoc, d as Prettify, P as PrettifyDeep, b as Primitive, R as RequiredKeysOf, S as StripEmptyObjects, U as UnionToIntersection, W as WithoutEmpty } from './shared/better-auth.D9UKno48.mjs';
export { O as OAuth2Tokens, a as OAuth2UserInfo, b as OAuthProvider, P as ProviderOptions } from './shared/better-auth.BxBsTPUO.mjs';
import 'kysely';
import 'zod';
import '@better-fetch/fetch';
import 'nanostores';
import 'jose';

declare function capitalizeFirstLetter(str: string): string;

declare const generateId: (size?: number) => string;

declare class BetterAuthError extends Error {
    constructor(message: string, cause?: string);
}
declare class MissingDependencyError extends BetterAuthError {
    constructor(pkgName: string);
}

declare function createTelemetry(options: BetterAuthOptions, context?: TelemetryContext): Promise<{
    publish: (event: TelemetryEvent) => Promise<void>;
}>;

declare function getTelemetryAuthConfig(options: BetterAuthOptions, context?: TelemetryContext): {
    database: string | undefined;
    adapter: string | undefined;
    emailVerification: {
        sendVerificationEmail: boolean;
        sendOnSignUp: boolean;
        sendOnSignIn: boolean;
        autoSignInAfterVerification: boolean;
        expiresIn: number | undefined;
        onEmailVerification: boolean;
        afterEmailVerification: boolean;
    };
    emailAndPassword: {
        enabled: boolean;
        disableSignUp: boolean;
        requireEmailVerification: boolean;
        maxPasswordLength: number | undefined;
        minPasswordLength: number | undefined;
        sendResetPassword: boolean;
        resetPasswordTokenExpiresIn: number | undefined;
        onPasswordReset: boolean;
        password: {
            hash: boolean;
            verify: boolean;
        };
        autoSignIn: boolean;
        revokeSessionsOnPasswordReset: boolean;
    };
    socialProviders: ({
        id?: undefined;
        mapProfileToUser?: undefined;
        disableDefaultScope?: undefined;
        disableIdTokenSignIn?: undefined;
        disableImplicitSignUp?: undefined;
        disableSignUp?: undefined;
        getUserInfo?: undefined;
        overrideUserInfoOnSignIn?: undefined;
        prompt?: undefined;
        verifyIdToken?: undefined;
        scope?: undefined;
        refreshAccessToken?: undefined;
    } | {
        id: string;
        mapProfileToUser: boolean;
        disableDefaultScope: boolean;
        disableIdTokenSignIn: boolean;
        disableImplicitSignUp: boolean | undefined;
        disableSignUp: boolean | undefined;
        getUserInfo: boolean;
        overrideUserInfoOnSignIn: boolean;
        prompt: "select_account" | "consent" | "login" | "none" | "select_account consent" | undefined;
        verifyIdToken: boolean;
        scope: string[] | undefined;
        refreshAccessToken: boolean;
    })[];
    plugins: string[] | undefined;
    user: {
        modelName: string | undefined;
        fields: Partial<Record<"name" | "emailVerified" | "email" | "image" | "createdAt" | "updatedAt", string>> | undefined;
        additionalFields: {
            [key: string]: FieldAttribute;
        } | undefined;
        changeEmail: {
            enabled: boolean | undefined;
            sendChangeEmailVerification: boolean;
        };
    };
    verification: {
        modelName: string | undefined;
        disableCleanup: boolean | undefined;
        fields: Partial<Record<"expiresAt" | "createdAt" | "updatedAt" | "value" | "identifier", string>> | undefined;
    };
    session: {
        modelName: string | undefined;
        additionalFields: {
            [key: string]: FieldAttribute;
        } | undefined;
        cookieCache: {
            enabled: boolean | undefined;
            maxAge: number | undefined;
        };
        disableSessionRefresh: boolean | undefined;
        expiresIn: number | undefined;
        fields: Partial<Record<"token" | "userId" | "expiresAt" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent", string>> | undefined;
        freshAge: number | undefined;
        preserveSessionInDatabase: boolean | undefined;
        storeSessionInDatabase: boolean | undefined;
        updateAge: number | undefined;
    };
    account: {
        modelName: string | undefined;
        fields: Partial<Record<"scope" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "idToken" | "userId" | "createdAt" | "updatedAt" | "providerId" | "accountId" | "password", string>> | undefined;
        encryptOAuthTokens: boolean | undefined;
        updateAccountOnSignIn: boolean | undefined;
        accountLinking: {
            enabled: boolean | undefined;
            trustedProviders: LiteralUnion<"apple" | "atlassian" | "discord" | "facebook" | "figma" | "github" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | "email-password", string>[] | undefined;
            updateUserInfoOnLink: boolean | undefined;
            allowUnlinkingAll: boolean | undefined;
        };
    };
    hooks: {
        after: boolean;
        before: boolean;
    };
    secondaryStorage: boolean;
    advanced: {
        cookiePrefix: boolean;
        cookies: boolean;
        crossSubDomainCookies: {
            domain: boolean;
            enabled: boolean | undefined;
            additionalCookies: string[] | undefined;
        };
        database: {
            useNumberId: boolean;
            generateId: false | ((options: {
                model: LiteralUnion<Models, string>;
                size?: number;
            }) => string | false) | undefined;
            defaultFindManyLimit: number | undefined;
        };
        useSecureCookies: boolean | undefined;
        ipAddress: {
            disableIpTracking: boolean | undefined;
            ipAddressHeaders: string[] | undefined;
        };
        disableCSRFCheck: boolean | undefined;
        cookieAttributes: {
            expires: Date | undefined;
            secure: boolean | undefined;
            sameSite: "none" | "lax" | "Strict" | "Lax" | "None" | "strict" | undefined;
            domain: boolean;
            path: string | undefined;
            httpOnly: boolean | undefined;
        };
    };
    trustedOrigins: number | undefined;
    rateLimit: {
        storage: "database" | "memory" | "secondary-storage" | undefined;
        modelName: string | undefined;
        window: number | undefined;
        customStorage: boolean;
        enabled: boolean | undefined;
        max: number | undefined;
    };
    onAPIError: {
        errorURL: string | undefined;
        onError: boolean;
        throw: boolean | undefined;
    };
    logger: {
        disabled: boolean | undefined;
        level: "error" | "info" | "warn" | "debug" | undefined;
        log: boolean;
    };
    databaseHooks: {
        user: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        session: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        account: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        verification: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
    };
};

export { BetterAuthError, BetterAuthOptions, LiteralUnion, MissingDependencyError, Models, TelemetryEvent, capitalizeFirstLetter, createTelemetry, generateId, getTelemetryAuthConfig };
