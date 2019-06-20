
exports.up = function(knex, Promise) {
  return knex.schema.createTable('news', function(table) {
    table.increments();
    table.integer('event_id');
    table.integer('series_id');
    table.date('posted_at');
    table.string('set_type');
    table.string('title');
    table.text('summary');
    table.text('article');
    table.string('picture_ids');
    table.string('page_layout');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('news');
};
