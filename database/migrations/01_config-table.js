/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = (knex) =>
 knex.schema.createTable("config", (table) => {
   table.increments("id");
   table.text("user").notNullable();
   table.text("email").notNullable();
   table.text("password").notNullable();
   table.text("name");
   table.text("key").notNullable();
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
export const down = (knex) => knex.schema.dropTable("config");
