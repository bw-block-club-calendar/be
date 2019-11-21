const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('users').select('id', 'username', 'email', 'type');
}

function findBy(filter) {
  return db('users')
    .select('*')
    .where(filter);
}

function findById(id) {
  return db('users')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('users')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('users')
        .where({ id: id })
        .del();
}
