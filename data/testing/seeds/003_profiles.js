
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          id: 1,
          first_name: 'Test',
          last_name: 'Admin',
          location_id: null,
        },
        {
          id: 2,
          first_name: 'Test',
          last_name: 'User',
          location_id: 1,
        },
        {
          id: 3,
          first_name: 'Louis',
          last_name: 'Gelinas',
          location_id: 3,
        },
        {
          id: 4,
          first_name: 'Tyson',
          last_name: 'Gersh',
          location_id: 4,
        },
      ]);
    });
};
