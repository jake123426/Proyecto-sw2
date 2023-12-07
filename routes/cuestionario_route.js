const { Router } = require('express');
const { body, param } = require('express-validator');
const { cuestionarioCreate, cuestionarioUpdate, cuestionarioGet, cuestionarioGetOne } = require('../controllers/cuestionario_controller')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/', cuestionarioGet );

router.get('/:id', [  // localhost:5000/api/cuestionario/1
    param('id', 'El parametro "id" es obligatorio').notEmpty(),
    validarCampos
], cuestionarioGetOne );

router.post('/', [  // localhost:5000/api/cuestionario
    body('topico', 'El campo "topico" es obligatorio').notEmpty(),
    body('texto', 'El campo "texto" es obligatorio').notEmpty(),
    body('usuario_id', 'El campo "usuario_id" es obligatorio').notEmpty(),
    body('modulo_id', 'El campo "moudlo_id" es obligatorio').notEmpty(),
    validarCampos
], cuestionarioCreate );

router.put('/:id', [   // localhost:5000/api/cuestionario
    param('id', 'El id del cuestionario es obligatorio').notEmpty(),
    body('topico').optional(),
    body('texto').optional(),
    body('usuario_id').optional(),
    body('modulo_id').optional(),
    validarCampos
], cuestionarioUpdate );

module.exports = router;