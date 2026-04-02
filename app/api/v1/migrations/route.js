import { NextResponse } from "next/server";
import migrationRunner from "node-pg-migrate";
import {join} from "path";
import db from "@/infra/database.js";



const defaultMigrationsOptions =  {
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  }

export async function GET() {

  const dbClient = await db.getNewClient();

  const pendingMigrations = await migrationRunner({
    ...defaultMigrationsOptions, 
    dbClient: dbClient, 
  });

  await dbClient.end();

  return NextResponse.json({migrations: pendingMigrations, status: 200});
}

export async function POST(req) {

  const dbClient = await db.getNewClient();

  const migratedMigrations = await migrationRunner({...defaultMigrationsOptions, dryRun: false, dbClient: dbClient, });

  await dbClient.end();
  
  if(migratedMigrations.length > 0){
    return NextResponse.json({ status: 201 });
  }
  return NextResponse.json({ migrations: migratedMigrations, status: 200 });
}
