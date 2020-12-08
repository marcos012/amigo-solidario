const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('caso', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        insertUser();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('deve criar um novo caso', async () => {
        const id = await getUserId();

        const response = await insertCaso(id);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toEqual(1);
    });

    it('deve listar casos', async () => {
        const id = await getUserId();

        await insertCaso(id);
        await insertCaso(id);
        await insertCaso(id);

        const response = await request(app).get(`/casos`)

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(3)
    });

    it('deve buscar caso por id', async () => {
        const id = await getUserId();

        const caso = await insertCaso(id);
        const idCaso = caso.body.id;

        const response = await request(app).get(`/casos/${idCaso}`)

        expect(response.body).toHaveProperty('titulo');
        expect(response.body).toHaveProperty('descricao');
        expect(response.body).toHaveProperty('local');
        expect(response.body).toHaveProperty('whatsapp');
        expect(response.body).toHaveProperty('email');
    });

    it('deve validar caso não encontrado', async () => {
        const response = await request(app).get(`/casos/900`)

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('Caso não encontrado');
    });
    it('deve deletar um caso', async () => {
        const id = await getUserId();

        const caso = await insertCaso(id);
        const idCaso = caso.body.id;

        const response = await request(app)
            .del(`/casos/${idCaso}`)
            .set('Authorization', id);

        expect(response.status).toEqual(204);
    });

    it('deve validar exclusão sem a devida permição', async () => {
        const id = await getUserId();

        const caso = await insertCaso(id);
        const idCaso = caso.body.id;

        const response = await request(app)
            .del(`/casos/${idCaso}`)
            .set('Authorization', 334360);

        expect(response.status).toEqual(401);
        expect(response.body.error).toEqual('Ação não permitida');
    });

    async function insertUser() {
        return await request(app)
            .post('/usuarios')
            .send({nome: 'Marcos', email: 'marcos@gmail.com', whatsapp: '51982346512', cidade: 'Porto Alegre', uf: 'RS'});
    }

    async function getUserId() {
        const reqUser = await request(app).get('/usuarios');
        const { id } = await reqUser.body[0];

        return id;
    }
    
    async function insertCaso(idUser) {
        return await request(app)
            .post('/casos')
            .set('Authorization', idUser)
            .send({titulo: 'Caso de teste' , descricao: 'Caso de teste', qtd_pessoas: 20, local: 'Rua Teste, 123'});
    }
});