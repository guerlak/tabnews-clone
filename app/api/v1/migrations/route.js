import { NextResponse } from "next/server";
import migrationRunner from "node-pg-migrate";
import {join} from "path";

const defaultMigrationsOptions =  {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  }

export async function GET() {

  const pendingMigrations = await migrationRunner({...defaultMigrationsOptions});

  return NextResponse.json({migrations: pendingMigrations, status: 200});
}

export async function POST(req) {
 
  const migratedMigrations = await migrationRunner({...defaultMigrationsOptions, dryRun: false});

  if(migratedMigrations.length > 0){
    return NextResponse.json({ status: 201 });
  }

  return NextResponse.json({ migrations: migratedMigrations, status: 200 });
}
