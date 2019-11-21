
exports.up = function(knex) {
  return knex.schema

  .createTable('events', tbl => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    tbl.increments(); // primary key automatically named 'id'

    tbl.string('organizer_type', 32)
      .notNullable();

    tbl.string('title', 128)
      .notNullable();

    tbl.string('description', 255)
      .notNullable();

    tbl.string('start', 255)
      .notNullable();

    tbl.string('end', 255)
      .notNullable();

    tbl.string('ext_link', 255);

    tbl.string('image', 255);

    tbl.boolean('approved')
      .defaultTo(false);

    // define a Foreign Key
    tbl.integer('user_id') // foreign key to user table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('users')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table

    // define a Foreign Key
    tbl.integer('location_id') // foreign key to location table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('events')
};
