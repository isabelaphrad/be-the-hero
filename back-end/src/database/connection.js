const knex = require('knex');
const configuration = require('../../knexfile');

//conexão com o bancod e dados
 const connection = knex(configuration.development);


 //exportar a conexão
module.exports = connection;
