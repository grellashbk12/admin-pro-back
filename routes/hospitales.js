/*
/api/hospitales
*/


const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospital, addHospital, updateHospital, deleteHospital } = require('../controllers/hospitales')

const router = Router();

router.get('/', getHospital);

router.post('/',
    [ 
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos 
    ],
    addHospital);

router.put('/:id',
    [],
    updateHospital);
router.delete('/:id', deleteHospital);




module.exports = router;