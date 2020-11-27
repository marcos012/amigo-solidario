const connection = require('../database/connection')

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('casos').count();

        const users = await connection('casos')
            .join('usuarios', 'usuarios.id', '=', 'casos.id_user')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['casos.*', 'usuarios.nome', 'usuarios.email', 'usuarios.whatsapp', 'usuarios.cidade', 'usuarios.uf']);

        res.header('X-Total-Count', count['count(*)']);
    
        return res.json(users);
    },

    async create(req, res) {
        const { titulo, descricao, qtd_pessoas } = req.body;
        const id_user = req.headers.authorization;
    
        const [id] = await connection('casos').insert({titulo, descricao, qtd_pessoas, id_user });
        
        return res.json({ id });
    },
    
    async delete(req, res) {
        const { id,  } = req.params;
        const id_user = req.headers.authorization;

        const caso = await connection('casos')
            .where('id', id)
            .select('id_user')
            .first();

        if(caso.id_user !== id_user) {
            return res.status(401).json({ error: 'Ação não permitida'});
        }

        await connection('casos').where('id', id).delete();

        return res.status(204).send();
    }
}