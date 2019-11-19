const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('locations').select('*');
}

function findBy(filter) {
  return db('locations')
    .select('*')
    .where(filter);
}

function add(location) {
  return db('locations')
    .insert(location, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('locations')
    .select('*')
    .where({ id })
    .first();
}
