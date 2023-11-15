const { Router } = require('express');

const { detectIntent } = require('../controllers/dialogflow_controller')

const router = Router();

router.post('/detectIntent', detectIntent );

module.exports = router;