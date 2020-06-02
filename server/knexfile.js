const config = require('config');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.get('db.host'),
      port: config.get('db.port'),
      user: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.database'),
    },
    migrations: {
      tableName: 'server_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: config.get('db.database'),
      user: config.get('db.user'),
      password: config.get('db.password')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'server_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'server_migrations'
    }
  }
};
