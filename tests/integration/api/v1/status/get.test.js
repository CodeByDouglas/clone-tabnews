import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // Testa o Json com a data da resposta;
  const responseBody = await response.json();

  const at_date_response = new Date(responseBody.update_at).toISOString;
  const at_date = new Date().toISOString;
  expect(at_date_response).toBe(at_date);

  // Testa a resposta da Versão atual do Postgres;
  expect(responseBody.db_version).toBeDefined();
  expect(responseBody.db_version).toBe("16.0");

  // Testa a resposta do max de conexões;
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).toBe(100);

  // Testa a resposta da QTD de conexões usadas;
  expect(responseBody.active_connections).toBeDefined();
  expect(responseBody.active_connections).toBe(1);
});
