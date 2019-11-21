module.exports = {
  addLocation,
  getOwnProfileLocation,
  getOwnOrganizationLocation,
  getOwnEventLocation
};

const Locations = require("./locationModel.js");
const Users = require("../user/userModel.js");

function addLocation(req, res, next) {

  const newLocation = req.body.location;

  if (newLocation) {
    Locations.add(newLocation)
      .then(location => {
        // console.log("passed addLoaction");
        req.newLocation = location;
        req.body.location_id = location.id
        delete req.body.location; // remove user submitted location object
        next();
      })
      .catch(err => {
        console.log("error from addLocation middleware", err);
        res.status(500).json({
          message: `Error adding the location to database.`,
          error: err.toString()
        })
      });

  } else {
    // newLocation undefined, move on
    next();
  }
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
    next(); // profile.location_id is null
  }
}

function getOwnOrganizationLocation(req, res, next) {
  const organization = req.ownOrganization;

  if (!organization) {
    next();
  } else if (organization.location_id) {
    Locations.findById(organization.location_id)
      .then(location => {
        req.ownOrganization.location = location;
        next();
      })
      .catch(err => {
        res.status(500).json({
          message: `Error getting location from the database.`,
          error: err.toString()
        })
      });
  } else {
    next(); // organization.location_id is null
  }
}

function getOwnEventLocation(req, res, next) {
  const event = req.ownEvent;

  if (!event) {
    next();
  } else if (event.location_id) {
    Locations.findById(event.location_id)
      .then(location => {
        req.ownEvent.location = location;
        next();
      })
      .catch(err => {
        res.status(500).json({
          message: `Error getting location from the database.`,
          error: err.toString()
        })
      });
  } else {
    next(); // event.organization_id is null
  }
}