
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('event_rsvp').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_rsvp').insert([
        {
          user_id: 1,
          event_id: 1
        },
        {
          user_id: 2,
          event_id: 1
        },
        {
          user_id: 3,
          event_id: 1
        },
        {
          user_id: 3,
          event_id: 2
        },
        {
          user_id: 4,
          event_id: 2
        },
      ]);
    });
};
