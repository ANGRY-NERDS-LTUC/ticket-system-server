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
    let allPackages = await Packages.findAll({where:{published:true,rejected:false,specialOffer:false}});
    res.status(200).json(allPackages);
}

packagesRoute.get('/specialOffers', bearer, checkUser(), handleGetAll);
async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allPackages = await Packages.findAll({where:{published:true,rejected:false,specialOffer:true}});
    res.status(200).json(allPackages);
}
module.exports = packagesRoute;
