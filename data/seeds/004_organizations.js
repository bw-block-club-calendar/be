
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('organizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('organizations').insert([
        {
          name: 'Michigan Urban Farming Initiative',
          org_phone: '5558675309',
          org_email: 'support@miufi.org',
          location_id: 1,
        },
        {
          name: 'Bamboo Detroit',
          org_phone: '3137660134',
          org_email: 'terri@bamboodetroit.com',
          location_id: 3,
        },
      ]);
    });
};
