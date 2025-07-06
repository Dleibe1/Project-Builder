/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */

//This table exists to keep track of files uploaded to AWS

exports.up = async (knex) => {
  await knex.schema.createTable("image_counter", (table) => {
    table.bigIncrements("id").primary()
    table.text("imageURL")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("image_counter")
}
