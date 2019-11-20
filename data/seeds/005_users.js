
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'testAdmin',
          password: '$2a$10$2J1LWmTQBRYiFYmev0rGTeWgzCLpGISsHP58Ut4gNh1C3UqIZDEAW',
          email: 'test@gmail.com',
          type: 'admin',
          profile_id: 1,
          organization_id: null,
        },
        {
          username: 'testUser',
          password: '$2a$10$brKZ85JDKxThPUS/qqWZHOQc.Y2nDaprHTIt1gx9fBB3qA9TIL7vy',
          email: 'test2@gmail.com',
          type: 'user',
          profile_id: 2,
          organization_id: null,
        },
        {
          username: 'jlgelinas',
          password: '$2a$10$brKZ85JDKxThPUS/qqWZHOQc.Y2nDaprHTIt1gx9fBB3qA9TIL7vy',
          email: 'jlgelinas@gmail.com',
          type: 'admin',
          profile_id: 3,
          organization_id: null,
        },
        {
          username: 'tysongersh',
          password: '$2a$10$brKZ85JDKxThPUS/qqWZHOQc.Y2nDaprHTIt1gx9fBB3qA9TIL7vy',
          email: 'tysongersh@miufi.org',
          type: 'user',
          profile_id: 4,
          organization_id: 1,
        },
      ]);
    });
};
