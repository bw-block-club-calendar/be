exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    users.increments(); // primary key automatically named 'id'

    users.string('username', 128)
      .notNullable()
      .unique();

    users.string('password', 255)
      .notNullable();

    users.string('email', 255)
      .notNullable()
      .unique();

    users.string('type', 32)
      .notNullable();
  });
};

exports.down = function(knex) {
  // drop tables in reverse order when using foreign keys
  return knex.schema
      .dropTableIfExists('users');
};
