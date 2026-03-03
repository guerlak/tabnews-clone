import { NextResponse } from "next/server";
import database from "@/infra/database.js";

export async function GET() {
  const updatedAt = new Date().toISOString();

  const res = await database.query("SHOW server_version");
  const server_version = res.rows[0].server_version;
  const res1 = await database.query("SHOW max_connections");
  const max_connections = res1.rows[0].max_connections;
  const res2 = await database.query("SELECT count(*) FROM pg_stat_activity;");
  const result2 = res2.rows[0];

  return NextResponse.json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        status: 200,
        max_connections,
        current_connections: result2.count,
        version: server_version,
      },
    },
  });
}
