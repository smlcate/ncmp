
exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function(table) {
    table.increments();
    table.string('email');
    table.string('hashed_passcode');
    table.text('membership');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('people');
};
