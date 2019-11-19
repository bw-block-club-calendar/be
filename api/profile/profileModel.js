const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('profiles').select('*');
}

function findBy(filter) {
  return db('profiles')
    .select('*')
    .where(filter);
}

function add(profile) {
  return db('profiles')
    .insert(profile, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('profiles')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('profiles')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('profiles')
        .where({ id: id })
        .del();
}
