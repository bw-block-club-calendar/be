const express = require('express');
const cors = require('cors')
const helmet = require('helmet') // third-party secure middleware
const logger = require('./loggerMiddleware.js'); // custom logger middleware
const restrictAuth = require('./restrictAuthMiddleware.js'); // require valid JWT
const restrictAdmin = require('./restrictAdminMiddleware.js'); // require admin type on decodedToken


const authRouter = require('./auth/authRouter.js');
const locationRouter = require('./location/locationRouter.js');
const profileRouter = require('./profile/profileRouter.js');
const organizationRouter = require('./organization/organizationRouter.js');
const eventRouter = require('./event/eventRouter.js');

// create server instances
const server = express();

// middeware
server.use(helmet());
server.use(express.json());
server.use(cors());
// CORS: research "credentials: true" and "withCredentials" when connecting from  react application




// routes

// routes accessible without token
server.use("/api/auth",
  logger('authRouter call'),
  authRouter);

server.use("/api/event",
  logger('eventRouter call'), 
  eventRouter);

// authorized user restricted endpoints
server.use("/api/profile",
  logger('profileRouter call'), 
  restrictAuth, 
  profileRouter);

server.use("/api/organization",
  logger('organizationRouter call'), 
  restrictAuth, 
  organizationRouter);

// admin restricted endpoints
server.use("/api/location",
  logger('locationRouter call'), 
  restrictAuth, 
  restrictAdmin, 
  locationRouter);



server.get('/', logger('root api call'), (req, res) => {
  res.status(200).json({ 
    api: "Block Club Calendar API running",
    message: "Use the 'api/event' endpoint to access publically available event data. All other data requires authentication, you can register for a new account at '/api/auth/register' in accordance with the documenation at '/docs'"})
});

server.get('*', logger('fallback api call'), (req, res) => {
    res.send('That endpoint is not defined')
});

// export
module.exports = server;