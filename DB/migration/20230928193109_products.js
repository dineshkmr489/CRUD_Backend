/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // Define the table using knex.schema.createTable
    return knex.schema.createTable('products', function (table) {
        table.increments('id');
        table.float('price').notNullable();
        table.string('name', 1000).notNullable();
        table.string('description', 1000).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // Specify how to reverse the changes (drop the table)
    return knex.schema.dropTable('products');
};
