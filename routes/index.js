const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); 

// home route (current does nothing)
router.get('/', (req, res) => {res.send('Hello World')});

// player routes
router.use('/player', require('./players'));

// magic item routes
router.use('/magicItem', require('./magicItems'));

// swagger route
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); 

module.exports = router;