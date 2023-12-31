const knex = require("./db");

/**
 * Checks the database connection and applies the latest migrations.
 *
 */
const checkDatabaseConnection = () => {
  return knex.migrate
    .latest()
    .then(() => {
      console.log("All migrations applied!");
      return knex.raw("SELECT 1+1 AS value"); // Test query to ensure database connection
    })
    .then((result) => {
      console.log(
        `Database connected successfully with value: ${result.rows[0].value}`
      );
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });
};

module.exports = checkDatabaseConnection;
