test("GET to api/v1/status should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  
  expect(responseBody.dependencies.database).toEqual({
    status: 200,
    max_connections: "100",
    current_connections: expect.any(String),
    version: expect.any(String),
  });
});
