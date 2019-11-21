const cleaner = require('knex-cleaner');

exports.seed = function(knex, Promise) {
  // return cleaner.clean(knex); // cleans all tables and resets primary keys
  // is clearing my knex tables and keeping me from rolling back
}