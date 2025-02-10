/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("tags", (table) => {
    table.bigIncrements("id").primary()
    table.string("tagName").notNullable().unique()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })

  await knex.schema.createTable("project_tags", (table) => {
    table
      .bigInteger("projectId")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
    table.bigInteger("tagId").notNullable().references("id").inTable("tags").onDelete("CASCADE")
    table.primary(["projectId", "tagId"])
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}
/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("project_tags")
  await knex.schema.dropTableIfExists("tags")
}
