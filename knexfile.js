// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'ncmp_'
    }
  },

  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
