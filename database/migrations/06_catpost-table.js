/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) =>
  knex.schema.createTable("catposts", (table) => {
    table.increments("id");
    table.integer("categories_id").unsigned();
    table
      .foreign("categories_id")
      .references("categories.id")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.integer("post_id").unsigned();
    table
      .foreign("post_id")
      .references("posts.id")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.dateTime("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .dateTime("updated_at")
      .defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP"));
    table.text("deleted_at");
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => knex.schema.dropTable("catposts");
