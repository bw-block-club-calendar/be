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
  return db('organizations').select('*');
}

function findBy(filter) {
  return db('organizations')
    .select('*')
    .where(filter);
}

function add(organization) {
  return db('organizations')
    .insert(organization, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('organizations')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('organizations')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('organizations')
        .where({ id: id })
        .del();
}
