'use strict';

const express = require('express');
const chart = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const acl = require('../../middleware/acl');
const router = express.Router();

router.get('/chart', bearer, acl('read'), handleGetAll);
router.get('/chart/:id', bearer, acl('read'), handleGetOne);
router.post('/chart', bearer, acl('create'), handleCreate);
router.update('/chart/:id', bearer, acl('update'), handleUpdate);
router.delete('/chart/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allChartPackages = await chart.get();
    res.status(200).json(allChartPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificChartPackage = await chart.get(id);
    res.status(200).json(specificChartPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let createdChartPackage = await chart.create(obj);
    res.status(201).json(createdChartPackage);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    let obj = req.body;
    let updatedChartPackage = await chart.update(id, obj);
    res.status(200).json(updatedChartPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedChartPackage = await chart.delete(id);
    res.status(204).json(deletedChartPackage);
}

module.exports = chartRoute;
