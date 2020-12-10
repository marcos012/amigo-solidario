const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  },
  test: {
    client: "sqlite3",
    connection: ":memory:",
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
  },
  production: {
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }

};
