'use strict';

const express = require('express');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const acl = require('../../middleware/acl');
const formRouter = express.Router();

formRouter.get('/form', bearer, acl('read'), checkCompany(), handleGetAll);
formRouter.get('/form/:id', bearer, acl('read'), checkCompany(), handleGetOne);
formRouter.post('/form', bearer, acl('create'), checkCompany(), handleCreate);
formRouter.put('/form/:id', bearer, acl('update'), checkCompany(), handleUpdate);
formRouter.delete('/form/:id', bearer, acl('delete'), checkCompany(), handleDelete);

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

module.exports = formRouter;

























// "use strict";
// const express = require("express");


// const { Packages } = require("../../models/models.connection");


// const packageRouter = express.Router();
// //add routes
// packageRouter.get("/package", getPackage);
// packageRouter.get("/package/:id", getOnePackage);
// packageRouter.post("/package", createPackage);
// packageRouter.put("/package/:id", updatePackage);
// packageRouter.delete("/package/:id", deletePackage);
// // to add functionality we need to add
// async function getPackage(req, res) {
//     let packages = await Packages.getAll();
//     res.status(200).json(packages);
// }
// //if we want to find one

// async function getOnePackage(req, res) {
//     const packageId = parseInt(req.params.id);
//     let package = await Packages.get(packageId);
//     res.status(200).json(package);
// }

// // for adding new record
// async function createPackage(req, res) {
//     let newPackage = req.body;
//     let package = await Packages.create(newPackage);
//     res.status(201).json(package);
// }

// async function updatePackage(req, res) {
//     let packageId = parseInt(req.params.id);
//     let updatePackage = req.body;
//     let foundPackage = await Packages.get(packageId);
//     if (foundPackage) {
//         let updatedPackage = await foundPackage.update(packageId, updatePackage);
//         res.status(201).json(updatedPackage);
//     }
// }


// async function deletePackage(req, res) {

//     let packageId = parseInt(req.params.id);
//     let deletePackage = await Packages.delete(packageId)
//     res.status(204).json(deletePackage);

// }
// module.exports = packageRouter;