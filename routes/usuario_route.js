const { Router } = require('express');
const { body, param } = require('express-validator');
const { usuarioGet } = require('../controllers/usuario_controller')



const router = Router();

router.get('/', usuarioGet );



module.exports = router;