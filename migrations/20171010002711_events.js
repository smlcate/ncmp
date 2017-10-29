
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments();
    table.string('name');
    table.integer('event_group_id');
    table.string('event_key');
    table.date('date');
    table.time('start');
    table.time('end');
    table.text('summary');
    table.text('description');
    table.string('image');
    table.string('color');
    table.string('layout');
    table.boolean('featured');
    table.string('status');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
