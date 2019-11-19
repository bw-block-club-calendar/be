exports.up = function(knex) {
  return knex.schema

  .createTable('locations', tbl => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    tbl.increments(); // primary key automatically named 'id'

    tbl.string('name', 255);

    tbl.string('coordinates', 255);

    tbl.string('street_address', 255);

    tbl.string('street_address_2', 255);

    tbl.string('city', 128);

    tbl.string('zipcode', 128);

    tbl.string('state', 128);
  })
  
  .createTable('profiles', tbl => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    tbl.increments(); // primary key automatically named 'id'

    tbl.string('first_name', 128);

    tbl.string('last_name', 128);

    // define a Foreign Key
    tbl.integer('location_id') // foreign key to address table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  })

  .createTable('organizations', tbl => {
    // .increments() creates a primary key, integer without negative values (unsigned)
    tbl.increments(); // primary key automatically named 'id'

    tbl.string('name', 255)
      .unique();

    tbl.string('org_phone', 128);

    tbl.string('org_email', 128);

    // define a Foreign Key
    tbl.integer('location_id') // foreign key to address table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  })
  
  .table('users', tbl => {

    // define a Foreign Key
    tbl.integer('profile_id') // foreign key to profile table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table

    // define a Foreign Key
    tbl.integer('organization_id') // foreign key to profile table
        .unsigned() // integer without negative values, db uses sign bit for larger #s
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE') // regards deleting recrod from the primary key table
        // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        .onUpdate('CASCADE'); // regards chaging the value of the primary key table
  });
};

exports.down = function(knex) {
  // drop tables in reverse order when using foreign keys
  return knex.schema
      .table('users', tbl => {
        tbl.dropColumn('profile_id')
        tbl.dropColumn('organization_id')
      })
      .dropTableIfExists('organizations')
      .dropTableIfExists('profiles')
      .dropTableIfExists('locations');
};
