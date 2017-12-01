
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sponsors', function(table) {
    table.increments();
    table.string('pageURL');
    table.text('imageDataURL');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sponsors');
};
