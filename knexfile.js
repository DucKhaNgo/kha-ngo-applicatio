// Update with your config settings.
require('dotenv').config(); 
const config = require('./config')
const knexConfig = {
  client: 'mysql',
  connection: JSON.parse(config.db),
  migrations: {
    directory: __dirname + '/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/knex/seeds',
  },
};

module.exports = knexConfig