'use strict';

const express = require('express');
const packages = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const acl = require('../../middleware/acl');
const router = express.Router();

router.get('/packages', bearer, acl('read'), handleGetAll);
rourter.get('/packages/:id', bearer, acl('read'), handleGetOne);
router.post('/packages', bearer, acl('create'), handleCreate);
router.put('/packages/:id', bearer, acl('update'), handleUpdate);
router.delete('/packages/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allPackages = await packages.get();
    res.status(200).json(allPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificPackage = await packages.get(id);
    res.status(200).json(specificPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let newPackage = await packages.create(obj);
    res.status(201).json(newPackage);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    let obj = req.body;
    let updatedPackage = await packages.update(id, obj);
    res.status(200).json(updatedPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedPackage = await packages.delete(id);
    res.status(204).json(deletedPackage);
}

module.exports = packageRoute;
