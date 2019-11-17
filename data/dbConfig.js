const knex = require('knex');

// config file contains properties for development, testing, and production
const config = require('../knexfile');

// pulls configuration mode from environment
const environment = process.env.DB_ENV || 'development';

// creates an instance of knex in the requested environment
module.exports = knex(config[environment]);