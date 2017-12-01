
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_groups', function(table) {
    table.increments();
    table.string('name');
    table.text('summary');
    table.text('description');
    table.string('color');
    table.string('picture_ids');
    table.string('page_layout');
    table.boolean('featured');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_groups');
};
