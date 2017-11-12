
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_groups').insert([
        {id: 1, name: 'KRA', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', color: 'lightblue', picture_ids: '[3]', page_layout: "A"},
      ]);
    });
};
