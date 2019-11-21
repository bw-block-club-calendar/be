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
  return db('events as e')
    .select('e.*', 'l.name', 'l.coordinates', 'l.street_address', 'l.street_address_2', 'l.city', 'l.zipcode', 'l.state')
    .join('locations as l', 'e.location_id', 'l.id')
    .orderBy('e.start')
}

function findBy(filter) {
  return db('events')
    .select('*')
    .where(filter);
}

function add(event) {
  return db('events')
    .insert(event, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('events')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('events')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('events')
        .where({ id: id })
        .del();
}
