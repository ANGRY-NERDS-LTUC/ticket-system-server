'use strict'; 

const express = require('express');
const wishList = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const acl = require('../../middleware/acl');
const router = express.Router();

router.get('/wishList', bearer, acl('read'), handleGetAll);
router.get('/wishList/:id', bearer, acl('read'), handleGetOne);
router.post('/wishList', bearer, acl('create'), handleCreate);
router.update('/wishList/:id', bearer, acl('update'), handleUpdate);
router.delete('/wishList/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allwishListPackages = await wishList.get();
    res.status(200).json(allwishListPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificwishListPackage = await wishList.get(id);
    res.status(200).json(specificwishListPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let createdwishListPackage = await wishList.create(obj);
    res.status(201).json(createdwishListPackage);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    let obj = req.body;
    let updatedwishListPackage = await wishList.update(id, obj);
    res.status(200).json(updatedwishListPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedwishListPackage = await wishList.delete(id);
    res.status(204).json(deletedwishListPackage);
}

module.exports = wishListRoute;
