const express = require("express");
const Items = require('../db/modles').Items;
const route = express.Router();

route.get('/all', (req, res) => {
    getAllItems(result => res.send(result));
})

route.get('/', (req, res) => {
    getItemById(req.query.id, result => res.send(result.dataValues));
});

route.post('/', (req, res) => {
    if (req.file) {
        req.body.imageName = req.file.filename;
    }
    addItem(req.body, result => res.send(result.dataValues));
});

route.put('/:id', (req, res) => {
    if (req.file) {
        req.body.imageName = req.file.filename;
    }
    updateItem(req.params.id, req.body, result => res.send(result.dataValues));
});

route.delete('/:id', (req, res) => {
    deleteItem(req.params.id, deletedItem => res.send(deletedItem));
});

function getAllItems(cb) {
    Items.findAll().then(result => cb(result))
}

function getItemById(itemId, cb) {
    Items.findById(itemId)
        .then(result => cb(result))
}

function addItem(itemInfo, cb) {
    Items.create(itemInfo)
        .then(result => cb(result))
        .catch(err => console.log(err))
}

function updateItem(itemId, newInfo, cb) {
    Items.update(newInfo, {where: {itemId: itemId}})
        .then(() => {
            return Items.findById(itemId)
        })
        .then(result => cb(result))
        .catch(err => console.log(err))
}

function deleteItem(itemId, cb) {
    let deletedItem;
    Items.findById(itemId)
        .then(result => {
        return new Promise(resolve => {
            deletedItem = result;
            resolve();
        })
    })
        .then(() => {return Items.destroy({where: {itemId: itemId}})})
        .then(() => cb(deletedItem))
        .catch(err => console.log(err))
}

exports.route = route;