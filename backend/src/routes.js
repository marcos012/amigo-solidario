const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UsuarioController = require('./controllers/UsuarioController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

//TODO: validar
routes.post('/login', LoginController.create);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), UsuarioController.create);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasoController.index);

routes.get('/casos/:id', CasoController.show);

//TODO: validar
routes.post('/casos', CasoController.create);

routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasoController.delete);

routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),PerfilController.index);

module.exports = routes;