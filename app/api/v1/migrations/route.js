import { NextResponse } from "next/server";
import migrationRunner from "node-pg-migrate";
import {join} from "path";

export async function GET() {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  return NextResponse.json({ migrations });
}
