const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  // console.log("request headers in auth middleware", req.headers)

  if (token) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    // check that the token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // bad panda, token has been tampered with
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};