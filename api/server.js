const express = require('express');
const cors = require('cors')
const helmet = require('helmet') // third-party secure middleware
const logger = require('./logger.js'); // custom logger middleware
// const requiresAuth = require('./api/requires-auth-middleware.js');

const server = express();

// middeware
server.use(helmet());
server.use(express.json());
// CORS: research "credentials: true" and "withCredentials" when connecting from  react application
server.use(cors()); 



// routes



server.get('/', logger('root api call'), (req, res) => {
  res.status(200).json({ api: "Block Club Calendar API running"})
});

server.get('*', logger('fallback api call'), (req, res) => {
    res.send('That endpoint is not defined')
});

// export
module.exports = server;