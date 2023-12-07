const { Router } = require('express');
const { body, param } = require('express-validator');
const { moduloGet } = require('../controllers/modulo_controller')



const router = Router();

router.get('/', moduloGet );



module.exports = router;