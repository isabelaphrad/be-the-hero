/**
 * Rota / Recurso
 */

/** 
 * Métodas HTTP:
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
*/

/**
 *  Tipos de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisção, utiizado para criar iu alterar recursos
 */

 /**
  * Driver: SELECT * FROM users
  * Query Builder: table('users').select('*').where()
  * 
 */

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
//transformar o json em javascript
app.use(express.json());
app.use(routes);

app.listen(3333);