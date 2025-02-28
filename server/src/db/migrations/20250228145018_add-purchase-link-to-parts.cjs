/**
 * @typedef {import("knex")} Knex
 */

const { KnexTimeoutError } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	await knex.schema.alterTable("parts", (table) => {
		table.text("partPurchaseURL")
	  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
	await knex.schema.alterTable("parts", (table) => {
		table.dropColumn("partPurchaseURL")
	})
};
