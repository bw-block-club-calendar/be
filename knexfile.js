// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'bcc_dev'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  testing: {
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'bcc_test'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/testing/migrations'
    },
    seeds: {
      directory: './data/testing/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './data/seeds'
    },
  }
};
