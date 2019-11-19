const router = require("express").Router();

const restrictAdmin = require('../restrictAdminMiddleware.js'); // require admin type on decodedToken

module.exports = router;
