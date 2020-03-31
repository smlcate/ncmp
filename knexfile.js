// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'samcate',
      password: 'ncmpTk88'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'samcate',
      // user:     'username',
      password: 'ncmpTk88'
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'samcate',
      // user:     'username',
      password: 'ncmpTk88'
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }

};
