const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        //se não houver paginas, fica com o valor padrão que é 1
        const { page = 1 } = request.query;

        //retorna um array, porem queremos só a primeira posição, por isso as []
        const [count] = await connection('incidents').count();

        console.log(count);

        //com paginação
        const incidents = await connection('incidents')
            //tras as ongs, onde o ongs_id é igual ao incidents.ong_id
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //retornar apenas 5 incidents
            .offset((page - 1)* 5) //pular de 5 em 5, a partir do 0
            //de acordo com o join, retorna todos os campos da tabela incidents, e alguns da tabelas ongs, explicitos abaixo
            .select(['incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.city', 
            'ongs.uf'
        ]);

            response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //devolve um array, neste caso de um único valor que é o id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //volta apenas um resultado

            if (incident.ong_id != ong_id) {
                return response.status(401).json({ error: 'Operation not permitted. '});
            }

            await connection('incidents').where('id', id).delete();

            //para enviar resposta sem conteudo para o front-end o status é 204
            return response.status(204).send();
    }
};