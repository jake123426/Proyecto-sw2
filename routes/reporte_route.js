const { Router } = require('express');
const { body, param } = require('express-validator');
const { reporteGet } = require('../controllers/reporte_controller')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/', reporteGet );




module.exports = router;