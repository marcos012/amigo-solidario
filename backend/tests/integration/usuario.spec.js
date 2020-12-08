const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('usuario', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('deve criar usuario', async () => {
        const response = await request(app)
            .post('/usuarios')
            .send({nome: 'Marcos', email: 'marcos@gmail.com', whatsapp: '51982346512', cidade: 'Porto Alegre', uf: 'RS'});

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});