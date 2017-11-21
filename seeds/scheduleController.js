
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scheduleController').del()
    .then(function () {
      // Inserts seed entries
      return knex('scheduleController').insert([
        {id: 1, year: '2017', open_date:'3/18/2017', close_date: '11/12/2017'},

      ]);
    });
};
