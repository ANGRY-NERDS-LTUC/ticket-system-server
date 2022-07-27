'use strict';

const express = require('express');
const { Charts } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const { Users } = require('../../models/models.connection');
const chartRoute = express.Router();

chartRoute.get('/chart', bearer, checkUser(), handleGetAll);
chartRoute.post('/chart', bearer, checkUser(), handleCreate);
chartRoute.delete('/chart/:id', bearer, checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allChartPackages = await Users.findOne({
        where: { id: userId},
        include: Charts
    });
    res.status(200).json(allChartPackages);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    let createdChartPackage = await Charts.create(obj);
    await user.addChart(createdChartPackage);
    res.status(201).json(createdChartPackage);
}

async function handleDelete(req, res) {
    let userId = req.user.id;
    let user = await Users.findOne({
        where: {id: userId},
        include: Charts
    })
    const paramsId = req.params.id;
    let chartId = await user.charts.map( (chart) => {
        if (paramsId == chart.id) {
            Charts.destroy({
                where: { id: paramsId },
            })
            return 'package successfully deleted';
        } 
    });
    res.status(200).send(chartId);
}

module.exports = chartRoute;
