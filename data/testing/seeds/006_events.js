
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          organizer_type: 'profile',
          title: 'Councilperson Sheffield Town Hall',
          description: 'Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!',
          start: '2019-11-21T18:00:00-0500',
          end: '2019-11-21T20:00:00-0500',
          ext_link: 'https://detroitmi.gov',
          image: "https://detroitmi.gov/themes/custom/detroitmi/logo.png",
          approved: true,
          user_id: 3,
          location_id: 2,
        },
        {
          organizer_type: 'organization',
          title: 'Trunk-or-Treat with the Lower North End Block Club',
          description: "Bring your friends and family to enjoy a night of fright on the Michigan Urban Farming Initiative's Campus! There will be handy, hot dog roasting, and a Zombie Walk for the kids.",
          start: '2019-10-31T18:00:00-0500',
          end: '2019-10-31T20:00:00-0500',
          ext_link: null,
          image: "https://i.ibb.co/hK3St7F/LNE-TOT.png",
          approved: true,
          user_id: 4,
          location_id: 1,
        },
      ]);
    });
};
