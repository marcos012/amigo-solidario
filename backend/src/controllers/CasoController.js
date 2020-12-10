const connection = require('../database/connection')

module.exports = {
    async show(req, res) {
        const { id } = req.params;

        const caso = await connection('casos')
            .join('usuarios', 'casos.id_user', '=', 'usuarios.id')
            .select([
                'casos.titulo',
                'casos.descricao',
                'casos.qtd_pessoas',
                'casos.local',
                'usuarios.nome',
                'usuarios.email',
                'usuarios.whatsapp',
                'usuarios.cidade',
                'usuarios.uf'
            ])
            .where('casos.id', id).first();

        if (!caso) {
            return res.status(404).json({ message: 'Caso não encontrado' });
        }

        return res.json(caso);

    },

    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('casos').count();

        const casos = await connection('casos')
            .join('usuarios', 'usuarios.id', '=', 'casos.id_user')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['casos.*', 'usuarios.nome', 'usuarios.email', 'usuarios.whatsapp', 'usuarios.cidade', 'usuarios.uf']);

        res.header('X-Total-Count', count['count(*)']);
    
        return res.json(casos);
    },

    async create(req, res) {
        const { titulo, descricao, qtd_pessoas, local } = req.body;
        const id_user = req.headers.authorization;
    
        try {
            const caso = await connection('casos').insert({titulo, descricao, qtd_pessoas, local, id_user });
            return res.json({id: caso[0]});
        } catch (e) {
            console.log(e);
            return res.status(500).send();
        }
    },
    
    async delete(req, res) {
        const { id } = req.params;
        const id_user = req.headers.authorization;

        const caso = await connection('casos')
            .where('id', id)
            .select('id_user')
            .first();

        if (caso.id_user !== id_user) {
            return res.status(401).json({ error: 'Ação não permitida'});
        }

        await connection('casos').where('id', id).delete();

        return res.status(204).send();
    }
}