import * as http from 'http';
import { IncomingHttpHeaders } from 'http';
import { n as Auth } from '../shared/better-auth.fpJnkfSu.cjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.DTtXpZYr.cjs';
import '../shared/better-auth.C7l4WiP6.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';

declare const toNodeHandler: (auth: {
    handler: Auth["handler"];
} | Auth["handler"]) => (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;

export { fromNodeHeaders, toNodeHandler };
