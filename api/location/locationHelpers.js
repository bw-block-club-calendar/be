module.exports = {
  addLocation,
  getOwnLocation
};

const Locations = require("./locationModel.js");

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

function getOwnLocation(req, res, next) {
  const profile = req.ownProfile;

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
}