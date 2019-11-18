
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'testAdmin',
          password: '$2a$10$2J1LWmTQBRYiFYmev0rGTeWgzCLpGISsHP58Ut4gNh1C3UqIZDEAW',
          email: 'test@gmail.com',
          type: 'admin'},
        {
          id: 2,
          username: 'testUser',
          password: '$2a$10$brKZ85JDKxThPUS/qqWZHOQc.Y2nDaprHTIt1gx9fBB3qA9TIL7vy',
          email: 'test2@gmail.com',
          type: 'user'},
      ]);
    });
};
