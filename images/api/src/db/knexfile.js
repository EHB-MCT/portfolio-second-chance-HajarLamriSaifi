/**
 * Knex Configuration File
 *
 * This file provides database configurations for different environments (e.g., development, test).
 * It uses the PostgreSQL (pg) client.
 *
 * @module knexfile
 * @see {@link http://knexjs.org/}
 */

module.exports = {
  /**
   * Development environment configuration.
   * Uses the PostgreSQL connection string from the environment variable.
   * Specifies directories for migrations and seed files.
   */
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING, 
    migrations: {
      directory: "./src/db/migrations", 
    },
    seeds: {
      directory: "./data/seeds", 
    },
  },

  /**
   * Test environment configuration.
   * Similar to the development configuration but intended for testing purposes.
   */
  test: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
