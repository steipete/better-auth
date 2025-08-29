import * as http from 'http';
import { IncomingHttpHeaders } from 'http';
import { n as Auth } from '../shared/better-auth.splEHBM8.js';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.D9UKno48.js';
import '../shared/better-auth.DAyNR7ES.js';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const toNodeHandler: (auth: {
    handler: Auth["handler"];
} | Auth["handler"]) => (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;

export { fromNodeHeaders, toNodeHandler };
