// Update with your config settings.

// module.exports = {
//
//   development: {
//     client: 'pg',
//     connection: {
//       database: 'ncmp_2'
//     }
//   },
//
//   production : {
//     client: 'pg',
//     connection: process.env.DATABASE_URL
//   }
//
// };

var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'ncmp_2'
    }
  },
  production : {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL
  }
};
