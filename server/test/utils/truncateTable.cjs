/**
 * Truncate a specific table using a raw knex query.
 * @param {string} tableName - The name of the table to truncate
 */
module.exports = async function truncateTable(tableName, knex) {
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "e2e") {
    throw Error(
      "Don't use table truncation test utility script outside of the 'test' node environment",
    )
  }

  if (!tableName || !knex) {
    throw Error("A table name and a knex instance are required.")
  }
  await knex.raw("TRUNCATE TABLE ?? RESTART IDENTITY CASCADE", [tableName])
}
