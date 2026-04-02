import database from "infra/database";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
}

beforeAll(cleanDatabase);

test("POST to api/v1/migrations should be empty", async () => {

  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const {status} = await response.json();

  expect(status).toBe(201);

  const response2  = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const {status: status2} = await response2.json();

  expect(status2).toBe(200);
  
}); 