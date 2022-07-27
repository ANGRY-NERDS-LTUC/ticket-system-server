'use strict';

const express = require('express');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const acl = require('../../middleware/acl');
const packageRouter = express.Router();

packageRouter.get('/packages', bearer, acl('read'), checkCompany(), handleGetAll);
packageRouter.get('/packages/:id', bearer, acl('read'), checkCompany(), handleGetOne);
packageRouter.post('/packages', bearer, acl('create'), checkCompany(), handleCreate);
packageRouter.put('/packages/:id', bearer, acl('update'), checkCompany(), handleUpdate);
packageRouter.delete('/packages/:id', bearer, acl('delete'), checkCompany(), handleDelete);

async function handleGetAll(req, res) {
    let allPackages = await Packages.getAll();
    res.status(200).json(allPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificPackage = await Packages.get(id);
    res.status(200).json(specificPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    obj.companyId = req.user.id;
    obj.company_Id = req.user.id;
    let newPackage = await Packages.create(obj);
    res.status(201).json(newPackage);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    let obj = req.body;
    let updatedPackage = await Packages.update(id, obj);
    res.status(200).json(updatedPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedPackage = await Packages.delete(id);
    res.status(204).json(deletedPackage);
}

module.exports = packageRouter;
