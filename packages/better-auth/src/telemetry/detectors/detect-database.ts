import { getPackageVersion } from "../../utils/package-json";
import type { DetectionInfo } from "../types";

const DATABASES: Record<string, string> = {
	pg: "postgresql",
	mysql: "mysql",
	mariadb: "mariadb",
	// SQLite removed for Edge runtime compatibility
	"@prisma/client": "prisma",
	mongoose: "mongodb",
	mongodb: "mongodb",
	"drizzle-orm": "drizzle",
};

export async function detectDatabase(): Promise<DetectionInfo | undefined> {
	for (const [pkg, name] of Object.entries(DATABASES)) {
		const version = await getPackageVersion(pkg);
		if (version) return { name, version };
	}
	return undefined;
}
