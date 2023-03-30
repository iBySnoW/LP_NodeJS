"use strict";

module.exports = {
  async up(knex) {
    await knex.schema.createTable("userFavoriteMovie", (table) => {
      table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
      table.integer("movie_id")
      .unsigned()
      .references("id")
      .inTable("movie")
      .onDelete("CASCADE");
    });
  },

  async down(knex) {
    await knex.schema.dropTableIfExists("userFavoriteMovie");
  },
};
