const express = require('express');
const cors = require('cors')
const helmet = require('helmet') // third-party secure middleware
const logger = require('./loggerMiddleware.js'); // custom logger middleware
const restrictAuth = require('./restrictAuthMiddleware.js'); // require valid JWT
const restrictAdmin = require('./restrictAdminMiddleware.js'); // require admin type on decodedToken


const authRouter = require('./auth/authRouter.js');
const locationRouter = require('./location/locationRouter.js');

// create server instances
const server = express();

// middeware
server.use(helmet());
server.use(express.json());
server.use(cors());
// CORS: research "credentials: true" and "withCredentials" when connecting from  react application




// routes

server.use("/api/auth",
  logger('authRouter call'),
  authRouter);

server.use("/api/location",
  logger('locationRouter call'), 
  restrictAuth, 
  restrictAdmin, 
  locationRouter);



server.get('/', logger('root api call'), (req, res) => {
  res.status(200).json({ api: "Block Club Calendar API running"})
});

server.get('*', logger('fallback api call'), (req, res) => {
    res.send('That endpoint is not defined')
});

// export
module.exports = server;