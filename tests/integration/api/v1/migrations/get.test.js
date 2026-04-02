import database from "infra/database";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
}

beforeAll(cleanDatabase);

test("GET to api/v1/migrations should return status 200", async () => {

  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const {migrations} = await response.json();
  expect(Array.isArray(migrations)).toBe(true);
  expect(migrations.length).toBeGreaterThan(0);

});

