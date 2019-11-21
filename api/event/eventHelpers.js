module.exports = {
  oldVerifyOwnEvent, // remove this middleware and pull user_id from req.header.authorization for post
  addEvent,
  getAllEvents,
  getOwnEvent,
  verifyOwnEvent,
  updateEvent
};

const Events = require("./eventModel.js");  
const Users = require("../user/userModel.js");

function oldVerifyOwnEvent(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;

  if (user.id === req.body.user_id) {
    // console.log("passed verifyOwnEvent");
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials (must be own event)"})
  }
}

function addEvent(req, res, next) {
  const newEvent = {
    user_id: req.body.user_id,
    organizer_type: req.body.organizer_type || null,
    title: req.body.title || null,
    description: req.body.description || null,
    start: req.body.start || null,
    end: req.body.end || null,
    ext_link: req.body.ext_link || null,
    image: req.body.image || null,
    location_id: req.newLocation.id
  }

  Events.add(newEvent)
    .then(event => {
      // console.log("passed addEvent");
      req.newEvent = event;
      next();
    })
    .catch(err => {
      console.log("error from addEvent middleware", err);
      res.status(500).json({
        message: `Error adding the event to database.`,
        error: err.toString()
      })
    });
}  

function getAllEvents(req, res, next) {

  Events.find()
    .then(events => {
      let eventList = events.map(event => {
        return {
          event_id: event.id,
          user_id: event.user_id,
          organizer_type: event.organizer_type,
          title: event.title,
          description: event.description,
          start: event.start,
          end: event.end,
          ext_link: event.ext_link,
          image: event.image,
          approved: event.approved,
          location: {
            id: event.location_id,
            name: event.name,
            coordinates: event.coordinates,
            street_address: event.street_address,
            street_address_2: event.street_address_2,
            city: event.city,
            zipcode: event.zipcode,
            state: event.state
          }
        }
      }
        )
      res.json(eventList);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting events from the database.`,
        error: err.toString()
      })
    });
}

function getOwnEvent(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;
  // console.log(user);

  Users.findById(user.id)
    .then(userEntry => {
      // console.log(userEntry);
      if (userEntry.event_id) {
        // add event to req.ownEvent
        Events.findById(userEntry.event_id)
          .then(event => {
            // console.log(event);
            req.ownEvent = event;
            // console.log("req.ownEvent", req.ownEvent);
            next();
          })
          .catch(err => {
            res.status(500).json({
              message: `Error getting event from the database.`,
              error: err.toString()
            })
          });
      } else {
        next(); // user.event_id is null
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting user's information from the database.`,
        error: err.toString()
      })
    });
}


function verifyOwnEvent(req, res, next) {
  const { id } = req.params;
  const user = req.decodedJwt;

  console.log("id from params", id);
  // check if user is the creator of event ? let them edit : 403
  Events.findById(id)
    .then(event => {
      if (event.user_id === user.id) {
        // add targeted event object to request
        req.targetEvent = event;
        next();
      }
      else {
        res.status(403).json({ message: 'Can only update your own events'})
      }
    })
    .catch(err => {
      res.status(404).json({
        message: `That event id is not in the database`,
        error: err.toString()
      })
    });

}


function updateEvent(req, res, next) {
  const id = req.targetEvent.id;
  const changes = req.body;
  console.log("target event", req.targetEvent)
  console.log("changes", changes);

  Events.update(changes, id)
    .then(records => {
      // update returns count of records updated
      console.log("records count", records)
      Events.findById(id)
        .then(updatedEvent => {
          req.updatedEvent = updatedEvent;
          next();
        })
        .catch(err => {
          res.status(500).json({
            message: `Update succeeded, error getting updated event from database.`,
            error: err.toString()
          })
        })

    })
    .catch(err => {
      res.status(500).json({
        message: `Error updating the event in the database.`,
        error: err.toString()
      })
    });
}  