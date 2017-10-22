
exports.up = function(knex, Promise) {
  return knex.schema.createTable('news', function(table) {
    table.increments();
    table.string('title');
    table.text('summary');
    table.text('article');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('news');
};
