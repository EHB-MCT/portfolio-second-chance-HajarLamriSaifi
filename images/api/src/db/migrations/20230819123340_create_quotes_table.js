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

exports.down = function (knex) {
  return knex.schema.dropTable("quotes").then(() => {
    console.log("Quotes table dropped.");
  });
};
