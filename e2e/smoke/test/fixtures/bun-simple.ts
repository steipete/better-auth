import { betterAuth } from "better-auth";

export const auth = betterAuth({
	baseURL: "http://localhost:4000",
	emailAndPassword: {
		enabled: true,
	},
	logger: {
		level: "debug",
	},
});

const server = Bun.serve({
	fetch: auth.handler,
	port: 0,
});

console.log(server.port);
