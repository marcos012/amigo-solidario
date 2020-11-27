const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async index(req, res) {
        const usuarios = await connection('usuarios').select('*');
    
        return res.json(usuarios);
    },

    async create(req, res) {
        const { nome, email, whatsapp, cidade, uf } = req.body;

        const id = generateUniqueId();
        
        await connection('usuarios').insert({id, nome, email, whatsapp, cidade, uf });
    
        return res.json({ id });
    }
}