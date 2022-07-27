'use strict';

const express = require('express');
const { Charts } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const acl = require('../../middleware/acl');
const chartRoute = express.Router();

chartRoute.get('/chart', bearer, acl('read'), checkUser(), handleGetAll);
chartRoute.get('/chart/:id', bearer, acl('read'), checkUser(), handleGetOne);
chartRoute.post('/chart', bearer, acl('create'), checkUser(), handleCreate);
chartRoute.delete('/chart/:id', bearer, acl('delete'), checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let allChartPackages = await Charts.getAll();
    res.status(200).json(allChartPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificChartPackage = await Charts.get(id);
    res.status(200).json(specificChartPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let createdChartPackage = await Charts.create(obj);
    res.status(201).json(createdChartPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedChartPackage = await Charts.delete(id);
    res.status(204).json(deletedChartPackage);
}

module.exports = chartRoute;
