
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name: 'KRA 1', event_group_id: 1, color: 'lightblue', date: '10/10/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 1'},
        {id: 12, name: 'KRA 2', event_group_id: 1, color: 'lightblue', date: '10/17/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},

      ]);
    });
};
