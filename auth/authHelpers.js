module.exports = {
  validateUser
};

const Auth = require("./authModel.js");

async function validateUser(user) {
  let errors = [];

  await Auth.findBy({ username: user.username })
    .then(user => {
      if (user) {
        errors.push("That username is taken")
        // console.log(user);
      }
    })

  await Auth.findBy({ email: user.email })
    .then(user => {
      if (user) {
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