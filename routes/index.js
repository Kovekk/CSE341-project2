const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); 
const util = require('../utilities/util');

// home route (current does nothing)
router.get('/', (req, res) => {res.send('Hello World')});

// player routes
router.use('/player', util.isLoggedIn, require('./players')
/* #swagger.security = [{
        "oAuth": []
    }] */
);

// magic item routes
router.use('/magicItem', util.isLoggedIn, require('./magicItems')
/* #swagger.security = [{
        "oAuth": []
    }] */
);

// swagger route

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); 

module.exports = router;