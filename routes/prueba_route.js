const { Router } = require('express');
const { body, param } = require('express-validator');
const { pruebaInit, siguientePregunta } = require('../controllers/prueba_controller')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/iniciar/:cant', [  // localhost:5000/api/prueba/iniciar/3
    param('cant', 'El parametro "cantidad" es obligatorio').notEmpty(),
    validarCampos
], pruebaInit );


router.post('/siguiente', [  // localhost:5000/api/prueba/siguiente
    body('respuesta', 'El campo "respuesta" es obligatorio').notEmpty(),    
    validarCampos
], siguientePregunta );


module.exports = router;