const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const controller = {};

controller.getAllPlayers = function (req, res) {
    const result = mongodb.getDb().db().collection('players').find();
    result.toArray().then((players) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players);
    });
}

controller.getPlayerById = function (req, res, next) {
    const playerId = new ObjectId(req.params.id);
        const result = mongodb.getDb().db().collection('players').find({ _id: playerId });
        result.toArray().then((player) => {
            // console.log(player[0]);
            try {
                // Returns nothing if there is no player with the given id
            if (!player[0]) {
                throw createError(404, 'Player does not exist.');
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(player[0]);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
        });
    
    
}

controller.createPlayer = function (req, res) {
    const player = {
        "name": req.body.name,
        "race": req.body.race,
        "class": req.body.class,
        "background": req.body.background,
        "strength": req.body.strength,
        "dexterity": req.body.dexterity,
        "constitution": req.body.constitution,
        "wisdom": req.body.wisdom,
        "intelligence": req.body.intelligence,
        "charisma": req.body.charisma,
        "inspiration": req.body.inspiration,
        "hp": req.body.hp,
        "magicItemList" : []
    };
    const result = mongodb.getDb().db().collection('players').insertOne(player).then(result => {
        res.send(result.insertedId.toString());
    })
}

controller.updatePlayer = function (req, res, next) {
    const player = {
        "name": req.body.name,
        "race": req.body.race,
        "class": req.body.class,
        "background": req.body.background,
        "strength": req.body.strength,
        "dexterity": req.body.dexterity,
        "constitution": req.body.constitution,
        "wisdom": req.body.wisdom,
        "intelligence": req.body.intelligence,
        "charisma": req.body.charisma,
        "inspiration": req.body.inspiration,
        "hp": req.body.hp
    };
    const playerId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('players')
        .updateOne({_id: playerId}, {$set: player})
        .then((result) => {
            try {
                if (result.matchedCount == 0) {
                    throw createError(404, 'Player with that id does not exist.');
                }
            res.status(204).send({status: 204});
            } catch (error) {
                console.log(error.message);
                next(error);
            }
            // console.log(result.matchedCount);
    });
}

controller.deletePlayer = function (req, res) {
    const playerId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('players')
    .deleteOne({ _id: playerId })
    .then(result => {
        try {
            if (result.matchedCount == 0) {
                throw createError(404, 'Player with that id does not exist.');
            }
        res.status(204).send({status: 204});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    });
}

controller.addMagicItem = function (req, res) {
    const magicItemId = req.params.magicItemId;
    const playerId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('players').find({ _id: playerId });
    result.toArray().then((playerResult) => {
        let magicItems
        try {
            if (!playerResult[0]) {
                throw createError(404, 'Player with that id does not exist.');
            }
            magicItems = playerResult[0].magicItemList;
            magicItems.push(magicItemId);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
        
        const result2 = mongodb.getDb().db().collection('players')
        .updateOne({_id: playerId}, {$set: {"magicItemList": magicItems}})
        .then(result => {
            res.status(204).send({status: 204});
        })
    });
}

controller.removeMagicItem = function (req, res) {
    const magicItemId = req.params.magicItemId;
    const playerId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('players').find({ _id: playerId });
    result.toArray().then((playerResult) => {
        let magicItems
        try {
            if (!playerResult[0]) {
                throw createError(404, 'Player with that id does not exist.');
            }
            magicItems = playerResult[0].magicItemList;
            // remove an item from magic items list
            const index = magicItems.indexOf(magicItemId);
            console.log(index);
            magicItems.splice(index, 1);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
        

        const result2 = mongodb.getDb().db().collection('players')
        .updateOne({_id: playerId}, {$set: {"magicItemList": magicItems}})
        .then(result => {
            res.status(204).send({status: 204});
        })
    });
}

controller.getMagicItemList = function (req, res) {
    const playerId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('players').find({ _id: playerId });
    result.toArray().then((playerResult) => {
        let magicItems
        try {
            if (!playerResult[0]) {
                throw createError(404, 'Player with that id does not exist.');
            }
            magicItems = playerResult[0].magicItemList;
        } catch (error) {
            console.log(error.message);
            next(error);
        }
        res.status(200).send(magicItems);
    });
}

module.exports = controller;