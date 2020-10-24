
exports.up = function(knex) {
  return knex.schema.createTable('eventSchedule', function(table) {
    table.increments();
    table.text('schedule_data');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('eventSchedule');
};
