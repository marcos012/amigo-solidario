const knex = require('knex');

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile')[environment];

const connection = knex(config);

module.exports = connection;