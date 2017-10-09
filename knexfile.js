// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'ncmp_2.0'
    }
  },

  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
