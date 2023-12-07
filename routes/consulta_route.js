const { Router } = require('express');
const { body, param } = require('express-validator');

const { consultaGet } = require('../controllers/consulta_controller')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/', [
    body('consulta', 'El campo "consulta" es obligatorio').notEmpty(),
    validarCampos
], consultaGet );

module.exports = router;