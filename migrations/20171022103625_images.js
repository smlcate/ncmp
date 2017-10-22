
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', function(table) {
    table.increments();
    table.text('dataURL');
    table.integer('group_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
