module.exports = {
  addLocation,
  getOwnProfileLocation
};

const Locations = require("./locationModel.js");
const Users = require("../user/userModel.js");

function addLocation(req, res, next) {
  const newLocation = req.body.location || {};

  Locations.add(newLocation)
    .then(location => {
      // console.log("passed addLoaction");
      req.newLocation = location;
      next();
    })
    .catch(err => {
      console.log("error from addLocation middleware", err);
      res.status(500).json({
        message: `Error adding the location to database.`,
        error: err.toString()
      })
    });
}

function getOwnProfileLocation(req, res, next) {
  const profile = req.ownProfile;

  if (!profile) {
    next();
  } else if (profile.location_id) {
    Locations.findById(profile.location_id)
      .then(location => {
        req.ownProfile.location = location;
        next();
      })
      .catch(err => {
        res.status(500).json({
          message: `Error getting location from the database.`,
          error: err.toString()
        })
      });
  } else {
    next(); // user.profile_id is null
  }
}