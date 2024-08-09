/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	return knex.schema.dropTableIfExists("imageUploads")
  }
  
  /**
   * @param {Knex} knex
   */
  exports.down = (knex) => {
	return knex.schema.dropTableIfExists("imageUploads")
  }
  