/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable("tags")
  if (!hasTable) {
    await knex.schema.createTable("tags", (table) => {
      table.bigIncrements("id").primary()
      table.string("tagName").notNullable().unique()
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
  }
  await knex.schema.createTable("project_tags", (table) => {
    table.bigInteger("projectId").references("projects.id").notNullable().onDelete("CASCADE")
    table.bigInteger("tagId").references("tags.id").notNullable().onDelete("CASCADE")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("project_tags")
  await knex.schema.dropTableIfExists("tags")
}
