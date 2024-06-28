const router = require('express').Router();
const controller = require('../controllers/magicItems');
const { playerValidationRules, magicItemValidationRules, validate } = require('../utilities/validationRules');

// get all magic items
router.get('/', controller.getAllMagicItems);

// get magic item by id
router.get('/:id', controller.getMagicItemById);

// create new magic item
router.post('/', magicItemValidationRules(), validate, controller.createMagicItem);

// udpate existing magic item
router.put('/:id', magicItemValidationRules(), validate, controller.updateMagicItem);

// delete existing magic item
router.delete('/:id', controller.deleteMagicItem);

module.exports = router;