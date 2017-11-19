
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scheduleController', function(table) {
    table.increments();
    table.integer('year');
    table.date('open_date');
    table.date('close_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scheduleController');
};
