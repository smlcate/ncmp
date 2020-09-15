
exports.up = function(knex) {
  return knex.schema.createTable('rules', function(table) {
    table.increments();
    table.date('update_date')
    table.text('ruleData');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rules');
};
