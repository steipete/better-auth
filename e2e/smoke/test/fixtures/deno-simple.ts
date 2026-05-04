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

Deno.serve(
	{
		port: 0,
		onListen: ({ port }) => {
			console.log(`Listening on http://localhost:${port}`);
		},
	},
	auth.handler,
);
