import { Kysely, MssqlDialect } from "kysely";
import {
	type Dialect,
	MysqlDialect,
	PostgresDialect,
} from "kysely";
import type { BetterAuthOptions } from "../../types";
import type { KyselyDatabaseType } from "./types";

export function getKyselyDatabaseType(
	db: BetterAuthOptions["database"],
): KyselyDatabaseType | null {
	if (!db) {
		return null;
	}
	if ("dialect" in db) {
		return getKyselyDatabaseType(db.dialect as Dialect);
	}
	if ("createDriver" in db) {
		// SQLite support removed for Edge runtime compatibility
		if (db instanceof MysqlDialect) {
			return "mysql";
		}
		if (db instanceof PostgresDialect) {
			return "postgres";
		}
		if (db instanceof MssqlDialect) {
			return "mssql";
		}
	}
	// SQLite checks removed for Edge runtime compatibility

	if ("getConnection" in db) {
		return "mysql";
	}
	if ("connect" in db) {
		return "postgres";
	}
	return null;
}

export const createKyselyAdapter = async (config: BetterAuthOptions) => {
	const db = config.database;

	if (!db) {
		return {
			kysely: null,
			databaseType: null,
		};
	}

	if ("db" in db) {
		return {
			kysely: db.db,
			databaseType: db.type,
		};
	}

	if ("dialect" in db) {
		return {
			kysely: new Kysely<any>({ dialect: db.dialect }),
			databaseType: db.type,
		};
	}

	let dialect: Dialect | undefined = undefined;

	const databaseType = getKyselyDatabaseType(db);

	if ("createDriver" in db) {
		dialect = db;
	}

	// SQLite dialect creation removed for Edge runtime compatibility

	if ("getConnection" in db) {
		// @ts-expect-error - mysql2/promise
		dialect = new MysqlDialect(db);
	}

	if ("connect" in db) {
		dialect = new PostgresDialect({
			pool: db,
		});
	}

	// Bun SQLite and Node SQLite support removed for Edge runtime compatibility

	return {
		kysely: dialect ? new Kysely<any>({ dialect }) : null,
		databaseType,
	};
};
