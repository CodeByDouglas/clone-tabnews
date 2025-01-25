import database from "infra/database.js";

async function status(request, response) {
  let variavelEsquecida;
  const databaseName = process.env.POSTGRES_DB;
  const conexao_usada = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const updateAT = new Date().toISOString();

  const dbversion = await database.query("SHOW server_version;");

  const maxconexao = await database.query("SHOW max_connections;");

  response.status(200).json({
    update_at: updateAT,
    db_version: dbversion.rows[0].server_version,
    max_connections: parseInt(maxconexao.rows[0].max_connections),
    active_connections: conexao_usada.rows[0].count,
  });
}
export default status;
