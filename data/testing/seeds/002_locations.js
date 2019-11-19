
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          id: 1,
          name: 'Michigan Urban Farming Initiative',
          coordinates: null,
          street_address: '7432 Brush St',
          street_address_2: null,
          city: 'Detroit',
          state: 'MI',
          zipcode: '48202',
        },
        {
          id: 2,
          name: 'Metropolitain United Methodist Church',
          coordinates: null,
          street_address: '8000 Woodward Ave',
          street_address_2: null,
          city: 'Detroit',
          state: 'MI',
          zipcode: '48202',
        },
        {
          id: 3,
          name: 'Bamboo Detroit',
          coordinates: null,
          street_address: '1420 Washington Blvd',
          street_address_2: "Suite 301",
          city: 'Detroit',
          state: 'MI',
          zipcode: '48226',
        },
        {
          id: 4,
          name: null,
          coordinates: null,
          street_address: '320 Horton St',
          street_address_2: null,
          city: 'Detroit',
          state: 'MI',
          zipcode: '48202',
        },
      ]);
    });
};
