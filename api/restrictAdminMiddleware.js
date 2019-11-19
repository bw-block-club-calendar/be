const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

module.exports = (req, res, next) => {
  const user = req.decodedJwt;

  if (user.type === "admin") {
    next();
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};