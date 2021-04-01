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
    // The next line is where the application will read that environment variable to connect to the database
    connection: process.env.HEROKU_POSTGRESQL_YELLOW_URL + '?sslmode=require',
    // migrations: {
    //     directory: '/migrations',
    // },
    // seeds: {
    //     directory: __dirname + '/db/seeds/production',
    // },
    // client: 'pg',
    // connection: {
    //   database: 'HEROKU_POSTGRESQL_YELLOW',
    //   // user:     'username',
    //   password: 'ncmpTk88'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }

};
