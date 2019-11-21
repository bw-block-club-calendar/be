const router = require("express").Router();

const Events = require("./eventModel.js")
const Users = require("../user/userModel.js")


const restrictAuth = require('../restrictAuthMiddleware'); // requires valid token
const restrictAdmin = require('../restrictAdminMiddleware.js'); // require admin type on decodedJwt
const { oldVerifyOwnEvent, addEvent, getAllEvents, getOwnEvent,
  verifyOwnEvent, updateEvent } = require("./eventHelpers.js");
const { addLocation, getOwnEventLocation } = require("../location/locationHelpers.js");

router.post("/",
  restrictAuth, // restrictAuth verifies user is logged in
  oldVerifyOwnEvent, // oldVerifyOwnEvent ensures decodedJwt.id matches req.user_id ? next : 401
  // verifyCompleteEvent, // verifyCompleteEvent ensures all required fields ? next : 400
  addLocation, // addLocation adds location to DB, creates req.newLocation object
  addEvent, // addEvent adds event to DB, creates req.newEvent object w/ location FK
  (req, res) => {
    // pull event_id FK from the req.newEvent object
    const newEvent = req.newEvent;
    const user = req.decodedJwt;
    
    res.status(201).json({
      event_id: newEvent.id,
      organizer_user_id: user.id,
      organizer_type: newEvent.organizer_type,
      title: newEvent.title,
      description: newEvent.description,
      start: newEvent.start,
      end: newEvent.end,
      ext_link: newEvent.ext_link,
      image: newEvent.image,
      location: req.newLocation
    });
});

router.get('/', 
  getAllEvents,
  // filterEventsByQuery // TODO: add query string middleware
  (req, res) => {
    const eventList = req.eventList;
    res.status(200).json(eventList);
});

router.get('/:id',
  (req, res) => {
    const { id } = req.params;
    Events.findById(id)
    .then(event => {
      if (!event) {
        res.status(404).json({ message: "Event with requested id is not found in database" });
      }
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting event from the database by id.`,
        error: err.toString()
      })
    });
});

// TODO: router.get('/own')
// router.get('/own', 
//   getOwnEvent, // getOwnEvent looksup your event_id, adds to req.ownEvent
//   // getOwnEventLocation, // getOwnEventLocation looks up your location_id, adds to req.ownEvent.location
//   (req, res) => {
//     const user = req.decodedJwt;
//     res.status(200).json({
//       user_id: user.id,
//       username: user.username,
//       event: {
//         ...req.ownEvent
//       }
//     })
// });

// TODO: router.get('/:id')

router.put('/:id',
  restrictAuth, // restrictAuth verifies user is logged in
  verifyOwnEvent,
  addLocation,
  updateEvent,
  (req, res) => {
    let updatedEvent = req.updatedEvent;
    res.status(200).json(updatedEvent)
  }
)

router.delete('/:id', 
  restrictAuth,
  verifyOwnEvent,
  (req, res) => {
    const { id } = req.params;

    Events.remove(id)
      .then(
        res.status(200).json({ message: `Event with id ${id} deleted.`})
      )
      .catch(err => {
        res.status(500).json({
          message: `Error getting event from the database.`,
          error: err.toString()
        })
      });
})

// TODO: router.del('/:id') admin only

module.exports = router;
