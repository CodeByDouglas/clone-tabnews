import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public; ");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const migrationsExecutadas = await database.query(
    "SELECT COUNT(*) FROM pgmigrations",
  );
  const quantidadeAplicada = parseInt(migrationsExecutadas.rows[0].count, 10);

  const fs = require("fs");
  const path = require("path");
  const migrationsDir = path.join(process.cwd(), "infra/migrations");
  const files = fs.readdirSync(migrationsDir);
  const quantidadeExistente = files.length;

  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(quantidadeAplicada).toBe(quantidadeExistente);
});
