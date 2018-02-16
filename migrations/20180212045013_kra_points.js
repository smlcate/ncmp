
exports.up = function(knex, Promise) {
  return knex.schema.createTable('kra_points', function(table) {
    table.increments();
    table.date('update_date')
    table.text('results');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('kra_points');
};
