
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      // Inserts seed entries
      return knex('people').insert([
        {id: 1, name: 'Sam'},
        {id: 2, name: 'Gabs'},
        {id: 3, name: 'Chase'}
      ]);
    });
};
