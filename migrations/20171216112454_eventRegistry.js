
exports.up = function(knex, Promise) {
  return knex.schema.createTable('eventRegistry', function(table) {
    table.increments();
    table.integer('series_id');
    table.text('registry_data');
    table.string('buffer_time');
    table.boolean('require_member');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('eventRegistry')
};
// Registry_data will look as such
// data = {
//  price: $$,
//  options: [{name:"",price:$$},{..}],
//  classes: [{name:"",cap:##},{..}]
// }
