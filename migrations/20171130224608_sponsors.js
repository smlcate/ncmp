
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sponsors', function(table) {
    table.increments();
    table.string('page_url');
    table.text('image_data_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sponsors');
};
