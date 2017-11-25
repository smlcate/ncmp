// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'ncmp',
      username: 'samcate',
      password: 'samandRoss6'
    }
  },

  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
