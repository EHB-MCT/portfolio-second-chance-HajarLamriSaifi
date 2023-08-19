/**
 * Migrations for the 'quotes' table.
 *
 * @module migrations/quotes
 */

/**
 * Applies the migration.
 *
 * In this migration, a 'quotes' table is created with the following columns:
 * - id: An auto-incremented primary key.
 * - quote: A string that cannot be null. This stores the actual quote text.
 * - user_id: An integer representing a foreign key to the 'users' table.
 *            If the corresponding user is deleted, any associated quotes will also be deleted.
 * - created_at: A timestamp that defaults to the current time.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise} A promise that resolves when the migration has been applied.
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("quotes", (table) => {
      table.increments("id").primary();
      table.string("quote").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log("Quotes table created.");
    });
};

/**
 * Reverses the migration.
 *
 * In this reversal, the 'quotes' table is dropped.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise} A promise that resolves when the migration has been reversed.
 */
exports.down = function (knex) {
  return knex.schema.dropTable("quotes").then(() => {
    console.log("Quotes table dropped.");
  });
};
