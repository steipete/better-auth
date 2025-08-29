import * as http from 'http';
import { IncomingHttpHeaders } from 'http';
import { n as Auth } from '../shared/better-auth.DkNEPIuu.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.mjs';
import '../shared/better-auth.2HpcRfGI.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const toNodeHandler: (auth: {
    handler: Auth["handler"];
} | Auth["handler"]) => (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;

export { fromNodeHeaders, toNodeHandler };
