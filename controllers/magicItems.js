const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const controller = {};

controller.getAllMagicItems = function (req, res) {
    const result = mongodb.getDb().db().collection('magicItems').find();
    result.toArray().then((magicItems) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(magicItems);
    });
}

controller.getMagicItemById = function (req, res) {
    const magicItemId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('magicItems').find({ _id: magicItemId });
    result.toArray().then((magicItem) => {
        try {
            if (!magicItem[0]) {
                throw createError(404, 'Magic Item does not exist.')
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(magicItem[0]);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    });
}

controller.createMagicItem = function (req, res) {
    const magicItem = {
        "name": req.body.name,
        "type": req.body.type,
        "rarity": req.body.rarity,
        "attunement": req.body.attunement
    };
    const result = mongodb.getDb().db().collection('magicItems').insertOne(magicItem).then(result => {
        res.send(result.insertedId.toString());
    })
}

controller.updateMagicItem = function (req, res) {
    const magicItem = {
        "name": req.body.name,
        "type": req.body.type,
        "rarity": req.body.rarity,
        "attunement": req.body.attunement
    };
    const magicItemId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('magicItems')
        .updateOne({_id: magicItemId}, {$set: magicItem})
        .then(result => {
            try {
                if (result.matchedCount == 0) {
                    throw createError(404, 'Magic Item with that id does not exist.');
                }
            res.status(204).send({status: 204});
            } catch (error) {
                console.log(error.message);
                next(error);
            }
    });
}

controller.deleteMagicItem = function (req, res) {
    const magicItemId = new ObjectId(req.params.id);
    const result = mongodb.getDb().db().collection('magicItems')
    .deleteOne({ _id: magicItemId })
    .then(result => {
        try {
            if (result.matchedCount == 0) {
                throw createError(404, 'Magic Item with that id does not exist.');
            }
        res.status(204).send({status: 204});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    });
}

module.exports = controller;