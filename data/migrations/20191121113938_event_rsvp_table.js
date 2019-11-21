
exports.up = function(knex) {
  return knex.schema

  .createTable('event_rsvp', tbl => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    tbl.increments(); // primary key automatically named 'id'

    // define a Foreign Key
    tbl.integer('user_id') // foreign key to user table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('users')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table

    // define a Foreign Key
    tbl.integer('event_id') // foreign key to location table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('events')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('event_rsvp')
  
};
