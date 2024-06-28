const router = require('express').Router();
const controller = require('../controllers/players');
const { playerValidationRules, magicItemValidationRules, validate } = require('../utilities/validationRules');

// get all players
router.get('/', controller.getAllPlayers);

// get player by id
router.get('/:id', controller.getPlayerById);

// create new player
router.post('/', playerValidationRules(), validate, controller.createPlayer);

// udpate existing player
router.put('/:id', playerValidationRules(), validate, controller.updatePlayer);

// delete existing player
router.delete('/:id', controller.deletePlayer);

// add existing magic item to player
router.put('/:id/addMagicItem/:magicItemId', controller.addMagicItem);

// remove existing magic item from player
router.put('/:id/removeMagicItem/:magicItemId', controller.removeMagicItem);

// Get list of magic items a player has
router.get('/:id/magicItemList', controller.getMagicItemList);

module.exports = router;