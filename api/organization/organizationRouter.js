const router = require("express").Router();

const Organizations = require("./organizationModel.js")
const Users = require("../user/userModel.js")


const restrictAdmin = require('../restrictAdminMiddleware.js'); // require admin type on decodedJwt
const { verifyNoOrganization, verifyOwnOrganization, 
  addOrganization, getOwnOrganization } = require("./organizationHelpers.js");
const { addLocation, getOwnOrganizationLocation } = require("../location/locationHelpers.js");

router.post("/",
  verifyNoOrganization, // verifyNoOrganization ensures the user has not created one yet ? next : 403
  verifyOwnOrganization, // verifyOwnOrganization ensures decodedJwt.id matches req.user_id ? next : 401
  addLocation, // addLocation adds location to DB, creates req.newLocation object
  addOrganization, // addOrganization adds organization to DB, creates req.newOrganization object w/ location FK
  (req, res) => {
    // pull organization_id FK from the req.newOrganization object
    const id = req.body.user_id;
    const changes = { organization_id: req.newOrganization.id };
    const user = req.decodedJwt;
    
    // update Users DB for req.user_id with FK reference to new organization
    Users.update(changes, id)
     .then(records => {
        // update returns count of records update
        res.status(201).json({
          user_id: user.id,
          username: user.username,
          organization: {
            ...req.newOrganization,
            location: req.newLocation
          }
        });
     })
     .catch(err => {
       console.log("error from POST organizationRouter", err);
       res.status(500).json({
         message: `Error updating the user in the database.`,
         error: err.toString()
       })
     });
});

router.get('/', restrictAdmin, (req, res) => {
  Organizations.find()
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting organizations from the database.`,
        error: err.toString()
      })
    });
});

router.get('/own', 
  getOwnOrganization, // getOwnOrganization looksup your organization_id, adds to req.ownOrganization
  getOwnOrganizationLocation, // getOwnOrganizationLocation looks up your location_id, adds to req.ownOrganization.location
  (req, res) => {
    const user = req.decodedJwt;
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      organization: {
        ...req.ownOrganization
      }
    })
});

// TODO: router.put('/own')

// TODO: router.del('/own')

// TODO: router.del('/:id') admin only

module.exports = router;
