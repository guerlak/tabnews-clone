import { NextResponse } from "next/server";
import database from "../../../../infra/database.js";

export async function GET() {
  const res = await database.query("SELECT 1 + 1 as sum;");
  console.log(res.rows);
  return NextResponse.json({ message: "aloha" });
}
