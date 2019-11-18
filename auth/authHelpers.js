module.exports = {
  validateUser
};

const Auth = require("./authModel.js");

// validateUser helper checks the user object from the "api/auth/register" endpoint
// validateUser is an async function that will check for valid username, password, email
// validateUser helper will also query for existing users with the requested username or email
// validateUser returns a boolean "isSuccessful" which is "true" for no errors
// valudateUser returns an array "errors" with a message for each failed validation
async function validateUser(user) {
  let errors = [];

  await Auth.findBy({ username: user.username })
    .then(results => {
      // console.log("results from username query", results);
      if (results[0]) {
        errors.push("That username is taken")
        // console.log(errors);
      }
    })

  await Auth.findBy({ email: user.email })
    .then(results => {
      // console.log("result from email query", results);
      if (results[0]) {
        errors.push("That email is taken")
        // console.log(user);
      }
    })

  if (!user.username || user.username.length < 2) {
    errors.push("Please include a username with at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Please include a password with at least 4 characters");
  }

  // console.log(errors);

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}