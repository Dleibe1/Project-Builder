/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	return knex.schema.createTable("instructions", (table) => {
	  table.bigIncrements("id")
  
	  table.bigInteger("projectId")
		.unsigned()
		.notNullable()
		.index()
		.references("id")
		.inTable("projects")
		.onDelete("CASCADE")
  
	  table.text("instructionText")
	  table.text("imageURL")
  
	  table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
	  table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
	})
  };
  
  /**
   * @param {Knex} knex
   */
  exports.down = async (knex) => {
	return knex.schema.dropTableIfExists("instructions")
  };