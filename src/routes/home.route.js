'use strict';
const express = require('express');
const homeRoute = express.Router();
const {
    Packages
} = require('../models/models.connection');

homeRoute.get('/packages', getPackages);
async function getPackages(req, res) {
    let allPackages = await Packages.findAll({
        where: {
            published: true,
            rejected: false,
            specialOffer: false
        }
    });
    res.status(200).json(allPackages);
}

homeRoute.get('/specialOffers', getspecialOffers);
async function getspecialOffers(req, res) {
    let allPackages = await Packages.findAll({
        where: {
            published: true,
            rejected: false,
            specialOffer: true
        }
    });
    res.status(200).json(allPackages);
}

module.exports = homeRoute;