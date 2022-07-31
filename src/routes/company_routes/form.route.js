'use strict';
const express = require('express');
const {
    Packages
} = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const companyRoute = express.Router();

companyRoute.post('/create', bearer, checkCompany(), handleCreate);
async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    obj.company_Id = user.id;
    obj.createdBy = req.user.displayName;
    let createdPackage = await Packages.create(obj);
    await user.addPackage(createdPackage);
    res.status(201).json(createdPackage);
}

// companyRoute.put('/update', bearer, checkCompany(), handleCreate);
// async function handleCreate(req, res) {
//     let user = req.user;
//     let obj = req.body;
//     // obj.company_Id = user.id;
//     // obj.createdBy = req.user.displayName;
//     let createdPackage = await Packages.update({

//     });
//     await user.addPackage(createdPackage);
//     res.status(201).json(createdPackage);
// }

companyRoute.get('/packages', bearer, checkCompany(), handleGetAll);
async function handleGetAll(req, res) {
    let company_Id = req.user.id;
    let allPackages = await Packages.findAll({
        where: {
            company_Id
        }
    });
    res.status(200).json(allPackages);
}

companyRoute.get('/packages/accepted', bearer, checkCompany(), getAcceptedPackages);
async function getAcceptedPackages(req, res) {
    let company_Id = req.user.id;
    let allPackages = await Packages.findAll({
        where: {
            company_Id,
            published: true
        }
    });
    res.status(200).json(allPackages);
}

companyRoute.get('/packages/rejected', bearer, checkCompany(), getRejectedPackages);
async function getRejectedPackages(req, res) {
    let company_Id = req.user.id;
    let allPackages = await Packages.findAll({
        where: {
            company_Id,
            rejected: true
        }
    });
    res.status(200).json(allPackages);
}

companyRoute.delete('/package/delete/:id', bearer, checkCompany(), handleDelete);
async function handleDelete(req, res) {
    const id = req.params.id;
    const companyId = req.user.id;
    await Packages.destroy({
        where: {
            id: id,
            company_Id: companyId
        },
    });
    res.send('Package successfully deleted');
}

module.exports = companyRoute;