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

  const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  await Auth.findBy({ username: user.username })
    .then(results => {
      if (results[0]) {
        errors.push("That username is taken")
      }
    })

  await Auth.findBy({ email: user.email })
    .then(results => {
      if (results[0]) {
        errors.push("That email is taken")
      }
    })

  if (!user.username || user.username.length < 2) {
    errors.push("Please include a username with at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Please include a password with at least 4 characters");
  }

  if (!emailTest.test(user.email)) {
    errors.push("Please include a valid email");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}