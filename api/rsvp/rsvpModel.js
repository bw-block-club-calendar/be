const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function add(rsvp) {
  return db('event_rsvp')
    .insert(rsvp, 'id')
    .then(ids => {
      console.log("inside rsvp add", ids);
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('event_rsvp').select('*');
}

function findBy(filter) {
  return db('event_rsvp')
    .select('*')
    .where(filter);
}

function findById(id) {
  return db('event_rsvp')
    .select('*')
    .where({ id })
    .first();
}

function update(changes, id){
    return db('event_rsvp')
        .where({ id: id})
        .update(changes);
}

function remove(id){
    return db('event_rsvp')
        .where({ id: id })
        .del();
}
