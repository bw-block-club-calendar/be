
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          first_name: 'Test',
          last_name: 'Admin',
          location_id: null,
        },
        {
          first_name: 'Test',
          last_name: 'User',
          location_id: 1,
        },
        {
          first_name: 'Louis',
          last_name: 'Gelinas',
          location_id: 3,
        },
        {
          first_name: 'Tyson',
          last_name: 'Gersh',
          location_id: 4,
        },
      ]);
    });
};
