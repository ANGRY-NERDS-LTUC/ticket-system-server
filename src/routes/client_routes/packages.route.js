'use strict';

const express = require('express');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const { Users } = require('../../models/models.connection');
const packagesRoute = express.Router();

packagesRoute.get('/packages', bearer, checkUser(), handleGetAll);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allPackages = await Packages.findAll();
    res.status(200).json(allPackages);
}

module.exports = packagesRoute;
