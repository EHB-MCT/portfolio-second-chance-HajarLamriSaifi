/**
 * Migrations for the 'users' table.
 *
 * @module migrations/users
 */

/**
 * Applies the migration.
 *
 * In this migration, a 'users' table is created with the following columns:
 * - id: An auto-incremented primary key.
 * - username: A unique string that cannot be null.
 * - password: A string that cannot be null.
 * - created_at: A timestamp that defaults to the current time.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise} A promise that resolves when the migration has been applied.
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log("Users table created.");
    });
};

/**
 * Reverses the migration.
 *
 * In this reversal, the 'users' table is dropped.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise} A promise that resolves when the migration has been reversed.
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").then(() => {
    console.log("Users table dropped.");
  });
};
