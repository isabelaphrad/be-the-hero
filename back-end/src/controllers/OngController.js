const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    //index: listagem de dados de uma tabela
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

    //para gerar o id
    const id = crypto.randomBytes(4).toString('HEX');

    //inserir dados na tabela
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
    }
}