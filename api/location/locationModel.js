const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function add(location) {
  return db('locations')
    .insert(location, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('locations').select('*');
}

function findBy(filter) {
  return db('locations')
    .select('*')
    .where(filter);
}

function findById(id) {
  return db('locations')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('locations')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('locations')
        .where({ id: id })
        .del();
}
