const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

const Auth = require("../user/userModel.js");
const { validateRegister } = require("./authHelpers.js");

// for endpoints beginning with /api/auth

// register a new user
// validateUser helper is an async function that will check for valid username, password, email
// validateUser helper will also query for existing users with the requested username or email
// validateUser returns a boolean "isSuccessful" which is "true" for no errors
// valudateUser returns an array "errors" with a message for each failed validation

router.post("/register", (req, res) => {
  let user = req.body;
  // always validate the data before sending it to the db
  validateRegister(user)
    .then(result => {
      console.log(result);
      if (result.isSuccessful === true) {
        const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
        user.password = hash;
    
        Auth.add(user)
          .then(saved => {
            // 2: produce a token
            const token = getJwtToken(saved);

            // 3: send the token to the client
            res.status(201).json({
              id: saved.id,
              username: saved.username,
              email: saved.email,
              token
            });
          })
          .catch(err => {
            console.log("error from Auth.add", err);
            res.status(500).json({
              message: `Error adding the user to database.`,
              error: err.toString()
            })
          });
      } else {
        // console.log(validateResult);
        res.status(400).json({
          message: "Invalid information about the user, see errors for details",
          errors: result.errors
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error adding the user to database.`,
        error: err.toString()
      })
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // 2: produce a token
        const token = getJwtToken(user); // functioned defined below

        // 3: send the token to the client
        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// 4
function getJwtToken(user) {
  // const payload = {
  //   username,
  //   role: "student" // this will probably come from the database
  // };

  const payload = user;

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
