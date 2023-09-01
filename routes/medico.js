/*
/api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedico, addMedico, updateMedico, deleteMedico } = require('../controllers/medico')

const router = Router();

router.get('/', getMedico);

router.post('/',
    [
        validarJWT,
        check('nombre', "El nombre del Hospital es requerido").not().isEmpty(),
        check('hospital', "El Hospital id debe ser valido").isMongoId(),

        validarCampos
    ],
    addMedico);

router.put('/:id',
    [],
    updateMedico);
router.delete('/:id', deleteMedico);




module.exports = router;