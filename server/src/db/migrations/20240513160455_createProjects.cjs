/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("projects", (table) => {
    table.bigIncrements("id")

    table.bigInteger("userId")
    .unsigned()
    .notNullable()
    .index()
    .references("users.id")

    table.text("githubFileURL")
    table.text("thumbnailImage").notNullable()
    table.string("title").notNullable()
    table.string("appsAndPlatforms")
    table.text("tags")
    table.text("description").notNullable()
    table.text("documentation")
    table.text("code")

    table.bigInteger("parentProjectId")
    .unsigned()
    .index()
    .references("id")
    .inTable("projects")

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("projects")
}
