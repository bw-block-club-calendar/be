const router = require("express").Router();

const Events = require("./eventModel.js")
const Users = require("../user/userModel.js")


const restrictAuth = require('../restrictAuthMiddleware'); // requires valid token
const restrictAdmin = require('../restrictAdminMiddleware.js'); // require admin type on decodedJwt
const { verifyOwnEvent, 
  addEvent, getAllEvents, getOwnEvent } = require("./eventHelpers.js");
const { addLocation, getOwnEventLocation } = require("../location/locationHelpers.js");

router.post("/",
  restrictAuth, // restrictAuth verifies user is logged in
  verifyOwnEvent, // verifyOwnEvent ensures decodedJwt.id matches req.user_id ? next : 401
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
  (req, res) => {
    const eventList = req.eventList;

    res.status(200).json(eventList);
});

router.get('/own', 
  getOwnEvent, // getOwnEvent looksup your event_id, adds to req.ownEvent
  // getOwnEventLocation, // getOwnEventLocation looks up your location_id, adds to req.ownEvent.location
  (req, res) => {
    const user = req.decodedJwt;
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      event: {
        ...req.ownEvent
      }
    })
});

// TODO: router.put('/own')

// TODO: router.del('/own')

// TODO: router.del('/:id') admin only

module.exports = router;
