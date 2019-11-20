const router = require("express").Router();

const Profiles = require("../profile/profileModel.js")
const Users = require("../user/userModel.js")


const restrictAdmin = require('../restrictAdminMiddleware.js'); // require admin type on decodedJwt
const { verifyNoProfile, verifyOwnProfile, 
  addProfile, getOwnProfile } = require("./profileHelpers.js");
const { addLocation, getOwnProfileLocation } = require("../location/locationHelpers.js");

router.post("/",
  verifyNoProfile, // verifyNoProfile ensures the user has not created one yet ? next : 403
  verifyOwnProfile, // verifyOwnProfile ensures decodedJwt.id matches req.user_id ? next : 401
  addLocation, // addLocation adds location to DB, creates req.newLocation object
  addProfile, // addProfile adds profile to DB, creates req.newProfile object w/ location FK
  (req, res) => {
    // pull profile_id FK from the req.newProfile object
    const id = req.body.user_id;
    const changes = { profile_id: req.newProfile.id };
    const user = req.decodedJwt;
    
    // update Users DB for req.user_id with FK reference to new profile
    Users.update(changes, id)
     .then(records => {
        // update returns count of records update
        res.status(201).json({
          user_id: user.id,
          username: user.username,
          profile: {
            ...req.newProfile,
            location: req.newLocation
          }
        });
     })
     .catch(err => {
       console.log("error from POST profileRouter", err);
       res.status(500).json({
         message: `Error updating the user in the database.`,
         error: err.toString()
       })
     });
});

router.get('/', restrictAdmin, (req, res) => {
  Profiles.find()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting profiles from the database.`,
        error: err.toString()
      })
    });
});

router.get('/own', 
  getOwnProfile, // getOwnProfile looksup your profile_id, adds to req.ownProfile
  getOwnProfileLocation, // getOwnProfileLocation looks up your location_id, adds to req.ownProfile.location
  (req, res) => {
    const user = req.decodedJwt;
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      profile: {
        ...req.ownProfile
      }
    })
});



module.exports = router;
