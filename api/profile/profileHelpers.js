module.exports = {
  verifyNoProfile,
  verifyOwnProfile,
  addProfile,
  getOwnProfile
};

const Profiles = require("./profileModel.js");  
const Users = require("../user/userModel.js");

function verifyNoProfile(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;

  Users.findById(user.id)
    .then(userEntry => {
      if (userEntry.profile_id) {
        res.status(403).json({ message: "User has previously created profile, use PUT"})
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

function verifyOwnProfile(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;
  console.log("request body to post profile", req.body);
  console.log("request headers to post profile", req.headers);
  console.log("decoded token", user);
  if (user.id === req.body.user_id) {
    // console.log("passed verifyOwnProfile");
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials (must be own profile)"})
  }
}

function addProfile(req, res, next) {
  const newProfile = {
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    location_id: req.newLocation.id
  }

  Profiles.add(newProfile)
    .then(profile => {
      // console.log("passed addProfile");
      req.newProfile = profile;
      next();
    })
    .catch(err => {
      console.log("error from addProfile middleware", err);
      res.status(500).json({
        message: `Error adding the profile to database.`,
        error: err.toString()
      })
    });
}  

function getOwnProfile(req, res, next) {
  // decodedJwt contains user object from register or login
  const user = req.decodedJwt;
  // console.log(user);

  Users.findById(user.id)
    .then(userEntry => {
      // console.log(userEntry);
      if (userEntry.profile_id) {
        // add profile to req.ownProfile
        Profiles.findById(userEntry.profile_id)
          .then(profile => {
            // console.log(profile);
            req.ownProfile = profile;
            // console.log("req.ownProfile", req.ownProfile);
            next();
          })
          .catch(err => {
            res.status(500).json({
              message: `Error getting profile from the database.`,
              error: err.toString()
            })
          });
      } else {
        next(); // user.profile_id is null
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting user's information from the database.`,
        error: err.toString()
      })
    });
}