'use strict';

const express = require('express');
const {
    Packages
} = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const {
    Companies
} = require('../../models/models.connection');
const formRoute = express.Router();

formRoute.get('/form', bearer, checkCompany(), handleGetAll);
formRoute.post('/form', bearer, checkCompany(), handleCreate);
formRoute.delete('/form/:id', bearer, checkCompany(), handleDelete);

async function handleGetAll(req, res) {
    let company_Id = req.user.id;
    let allPackages = await Packages.findAll({
        where: {
            company_Id
        }
    });
    res.status(200).json(allPackages);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    obj.company_Id = user.id;
    let createdPackage = await Packages.create(obj);
    await user.addPackage(createdPackage);
    res.status(201).json(createdPackage);
}

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

module.exports = formRoute;
