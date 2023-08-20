/**
 * Database Configuration and Initialization
 *
 *
 * @module db
 */

// Default to 'development' if not specified.
const environment = process.env.NODE_ENV || "development";

// Import the configuration for the determined environment from the knexfile.
const config = require("./knexfile")[environment];

// Create and configure an instance of knex with the appropriate configuration.
const knex = require("knex")(config);

// Export the configured knex instance for use in other parts of the application.
module.exports = knex;
