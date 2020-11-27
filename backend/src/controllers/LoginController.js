const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body

        const user = await connection('usuarios')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!user) {
            return res.status(400).json({ error: 'Usuário não localizado' });
        }

        return res.json(user);
    }
}