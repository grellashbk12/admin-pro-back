/*
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, addUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios);

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
],
addUsuarios);

router.put('/:id', 
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').isEmail(),
    validarCampos,

] ,
updateUsuario);
router.delete('/:id',validarJWT, deleteUsuario);




module.exports = router;