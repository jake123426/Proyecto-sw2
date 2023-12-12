const { Router } = require('express');
const { body, param } = require('express-validator');
const { usuarioGet, usuarioGetEstudiantes, usuarioGetOne, usuarioCreate, usuarioUpdate } = require('../controllers/usuario_controller')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/', usuarioGet );

router.post('/', [
    body('nombre', 'El campo "nombre" es obligatorio').notEmpty(),
    body('correo', 'El campo "correo" es obligatorio').notEmpty(),
    body('telefono', 'El campo "telefono" es obligatorio').notEmpty(),    
    validarCampos
], usuarioCreate );

router.put('/:id', [
    param('id', 'El id del estudiante es obligatorio').notEmpty(),
    body('nombre').optional(),
    body('correo').optional(),
    body('telefono').optional(),    
    validarCampos
], usuarioUpdate );

router.get('/estudiantes', usuarioGetEstudiantes );

router.get('/:id', [
    param('id', 'El parametro "id" es obligatorio').notEmpty(),
    validarCampos
], usuarioGetOne );



module.exports = router;