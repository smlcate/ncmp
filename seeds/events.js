
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table').del()
    .then(function () {
      // Inserts seed entries
      return knex('table').insert([
        {id: 1, name: 'KRA 1', event_group_id: 1, date: '06/07/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 1'},

      ]);
    });
};
