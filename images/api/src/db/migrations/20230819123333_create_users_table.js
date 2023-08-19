exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("password").notNullable(); 
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log("Users table created.");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").then(() => {
    console.log("Users table dropped.");
  });
};