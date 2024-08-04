/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	return knex.schema.dropTableIfExists("images")
  };
  
  /**
   * @param {Knex} knex
   */
  exports.down = async (knex) => {
	return knex.schema.dropTableIfExists("images")
  };