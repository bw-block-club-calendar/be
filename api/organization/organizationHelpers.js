module.exports = {
  verifyNoOrganization,
  verifyOwnOrganization,
  addOrganization,
  getOwnOrganization
};

const Organizations = require("./organizationModel.js");  
const Users = require("../user/userModel.js");

function verifyNoOrganization(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;

  Users.findById(user.id)
    .then(userEntry => {
      if (userEntry.organization_id) {
        res.status(403).json({ message: "User has previously created organization, use PUT"})
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting user's information from the database.`,
        error: err.toString()
      })
    });
}

function verifyOwnOrganization(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;

  if (user.id === req.body.user_id) {
    // console.log("passed verifyOwnOrganization");
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials (must be own organization)"})
  }
}

function addOrganization(req, res, next) {
  const newOrganization = {
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    location_id: req.newLocation.id
  }

  Organizations.add(newOrganization)
    .then(organization => {
      // console.log("passed addOrganization");
      req.newOrganization = organization;
      next();
    })
    .catch(err => {
      console.log("error from addOrganization middleware", err);
      res.status(500).json({
        message: `Error adding the organization to database.`,
        error: err.toString()
      })
    });
}  

function getOwnOrganization(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;
  // console.log(user);

  Users.findById(user.id)
    .then(userEntry => {
      // console.log(userEntry);
      if (userEntry.organization_id) {
        // add organization to req.ownOrganization
        Organizations.findById(userEntry.organization_id)
          .then(organization => {
            // console.log(organization);
            req.ownOrganization = organization;
            // console.log("req.ownOrganization", req.ownOrganization);
            next();
          })
          .catch(err => {
            res.status(500).json({
              message: `Error getting organization from the database.`,
              error: err.toString()
            })
          });
      } else {
        next(); // user.organization_id is null
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting user's information from the database.`,
        error: err.toString()
      })
    });
}