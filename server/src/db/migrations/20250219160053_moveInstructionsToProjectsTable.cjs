/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.dropTableIfExists("instructions")
  await knex.schema.alterTable("projects", (table) => {
    table.text("instructions")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("instructions")
}
