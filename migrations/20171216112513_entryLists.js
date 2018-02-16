
exports.up = function(knex, Promise) {
  return knex.schema.createTable('entry_list', function(table) {
    table.increments();
    table.integer('event_id');
    table.integer('series_id');
    table.text('entries')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entry_list');
};

// entries will look as such
// Entries = [
//   {
//     className:"",
//     entries:[
//       {
//         driverName:"",
//         kartNumber:##,
//         transponder:##,
//       },
//       {...}
//     ]
//   },
//   {...}
// ]
