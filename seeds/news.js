
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('news').del()
    .then(function () {
      // Inserts seed entries
      return knex('news').insert([
        {id: 1, event_id: 9, title: 'Halloween Party', summary: 'Come join us for Spooooooooooooookyyy tiiiimmeee at NCMP. Bring your friends, your family, your go-kart, and your witches hat and come enjoy the spooky fun!', article:'Fee is $10 for a family of four or $5 per person. No Witches hats (nor other costume equipment) are allowed on the track while operating'},

      ]);
    });
};
