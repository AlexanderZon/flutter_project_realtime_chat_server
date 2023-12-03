/**
 * path: api/login
 */

const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email tiene que ser válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario)

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email tiene que ser válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.get("/renew", validarJWT, renewToken);


module.exports = router;