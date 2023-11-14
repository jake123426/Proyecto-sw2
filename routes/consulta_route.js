const { Router } = require('express');

const { consultaGet } = require('../controllers/consulta_controller')

const router = Router();

router.post('/', consultaGet );

module.exports = router;