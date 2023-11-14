const { Router } = require('express');

const { consultaGet } = require('../controllers/consulta_controller')

const router = Router();

router.get('/', consultaGet );

module.exports = router;