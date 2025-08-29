import { p as AuthContext } from '../../shared/better-auth.IGoBAHaT.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.D9UKno48.cjs';
import '../../shared/better-auth.DcPaQ6CM.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const Providers: {
    readonly CLOUDFLARE_TURNSTILE: "cloudflare-turnstile";
    readonly GOOGLE_RECAPTCHA: "google-recaptcha";
    readonly HCAPTCHA: "hcaptcha";
};

interface BaseCaptchaOptions {
    secretKey: string;
    endpoints?: string[];
    siteVerifyURLOverride?: string;
}
interface GoogleRecaptchaOptions extends BaseCaptchaOptions {
    provider: typeof Providers.GOOGLE_RECAPTCHA;
    minScore?: number;
}
interface CloudflareTurnstileOptions extends BaseCaptchaOptions {
    provider: typeof Providers.CLOUDFLARE_TURNSTILE;
}
interface HCaptchaOptions extends BaseCaptchaOptions {
    provider: typeof Providers.HCAPTCHA;
    siteKey?: string;
}
type CaptchaOptions = GoogleRecaptchaOptions | CloudflareTurnstileOptions | HCaptchaOptions;

declare const captcha: (options: CaptchaOptions) => {
    id: "captcha";
    onRequest: (request: Request, ctx: AuthContext) => Promise<{
        response: Response;
    } | undefined>;
};

export { captcha };
