
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_groups').insert([
      ]);
    });
};
