/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) =>
  knex.schema.createTable("categories", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("slug");
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
export const down = (knex) => knex.schema.dropTable("categories");
