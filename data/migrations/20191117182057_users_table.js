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

    // define a Foreign Key
    users.integer('profile_id') // foreign key to profile table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('profiles')
        .onDelete('SET NULL') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table

    // define a Foreign Key
    users.integer('organization_id') // foreign key to profile table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('organizations')
        .onDelete('SET NULL') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  });
};

exports.down = function(knex) {
  // drop tables in reverse order when using foreign keys
  return knex.schema
      .dropTableIfExists('users');
};
