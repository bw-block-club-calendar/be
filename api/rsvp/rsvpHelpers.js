module.exports = {
  confirmNoRsvp,
  addRsvp
};

const Rsvps = require("./rsvpModel.js");

function confirmNoRsvp(req, res, next) {
  let { id } = req.params;
  let event_id = parseInt(id);
  let user_id = req.decodedJwt.id;

  Rsvps.findBy({ event_id: event_id, user_id: user_id })
    .then(results => {
      if(results.length === 0) {
        next();
      } else {
        res.status(403).json({ message: "You have already RSVP'd for this event"})
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error adding the rsvp to database.`,
        error: err.toString()
      })
    });
}

function addRsvp(req, res, next) {
  let { id } = req.params;
  let event_id = parseInt(id);
  let user_id = req.decodedJwt.id;

  let newRsvp = { user_id: user_id, event_id: event_id }

  console.log("newRsvp in helper", newRsvp)

  Rsvps.add(newRsvp)
    .then(rsvp => {
      // console.log("passed addEvent");
      req.newRsvp = rsvp;
      next();
    })
    .catch(err => {
      res.status(500).json({
        message: `Error adding the rsvp to database.`,
        error: err.toString()
      })
    });
  }  