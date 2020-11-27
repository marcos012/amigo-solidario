const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const id_user = req.headers.authorization;

        const casos = await connection('casos')
            .where('id_user', id_user)
            .select('*');

        return res.json(casos);
    }
}