
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name:'Track Opens', date:'3/14/2017', color: 'yellow'},
        {
          id: 2,
          name:'KRA 1',
          date: '4/02/2017',
          color:'lightblue',
          description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor egestas tempus. Fusce lobortis eros tempus auctor porttitor. Proin quam velit, malesuada id sagittis sit amet, ullamcorper quis erat. Fusce maximus lorem velit, ac dapibus elit vulputate nec. Etiam finibus dolor urna, in hendrerit urna ullamcorper vel. Donec eu euismod mauris, vitae varius neque. Sed et faucibus lorem. Nullam bibendum nulla ac felis finibus pulvinar. Integer auctor ex at cursus cursus. Cras egestas felis tortor, quis accumsan mi volutpat vel.',
          summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor egestas tempus. Fusce lobortis eros tempus auctor porttitor. Proin quam velit, malesuada id sagittis sit amet, ullamcorper quis erat. Fusce maximus lorem velit, ac dapibus elit vulputate nec. Etiam finibus dolor urna, in hendrerit urna ullamcorper vel. Donec eu euismod mauris, vitae varius neque. Sed et faucibus lorem. Nullam bibendum nulla ac felis finibus pulvinar. Integer auctor ex at cursus cursus. Cras egestas felis tortor, quis accumsan mi volutpat vel.',
          start:'8:00am',
          end:'8:00pm',
        }
      ]);
    });
};
