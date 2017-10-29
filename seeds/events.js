
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name: 'KRA 1', event_group_id: 1, color: 'lightblue', date: '10/7/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 1'},
        {id: 2, name: 'KRA 2', event_group_id: 1, color: 'lightblue', date: '10/14/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 3, name: 'KRA 3', event_group_id: 1, color: 'lightblue', date: '10/15/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 5, name: 'WKA', event_group_id: 2, color: '#E57373', date: '10/20/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 6, name: 'WKA', event_group_id: 2, color: '#E57373', date: '10/21/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 7, name: 'WKA', event_group_id: 2, color: '#E57373', date: '10/22/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 8, name: 'KRA 4', event_group_id: 1, color: 'lightblue', date: '10/28/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 9, name: 'Halloween Party', color: '#CE93D8', date: '10/25/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 10, name: 'KRA 5', event_group_id: 1, color: 'lightblue', date: '11/4/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 11, name: 'KRA 7', event_group_id: 1, color: 'lightblue', date: '11/17/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 12, name: 'KRA 6', event_group_id: 1, color: 'lightblue', date: '11/11/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 13, name: 'Great Lakes', event_group_id: 3, event_key:'24Abcc2', color: '#26A69A', date: '11/25/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 14, name: 'Great Lakes', event_group_id: 3, event_key:'24Abcc2', color: '#26A69A', date: '11/23/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},
        {id: 15, name: 'Great Lakes', event_group_id: 3, event_key:'24Abcc2', color: '#26A69A', date: '11/24/17', start: '8:00am', end: '8:00pm', summary: 'fun fun fun', description: 'fun describing fun about fun yay!', featured: true, status: 'on time', layout: 'layout 3'},

      ]);
    });
};
