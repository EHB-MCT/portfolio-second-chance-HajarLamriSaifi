module.exports = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  
  test: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};

