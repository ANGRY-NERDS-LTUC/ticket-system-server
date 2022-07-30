'use strict';

const express = require('express');
const { Charts } = require('../../models/models.connection');
const { SpecialOffers } = require('../../models/models.connection');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const { Users } = require('../../models/models.connection');
const chartRoute = express.Router();

chartRoute.get('/chart', bearer, checkUser(), handleGetAll);
chartRoute.post('/chart/:id', bearer, checkUser(), handleCreate);
chartRoute.delete('/chart/:id', bearer, checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allCharts = await Users.findOne({
        where: { id: userId },
        include: Charts
    })
    res.status(200).json(allCharts);
}

async function handleCreate(req, res) {
    let user = req.user;
    // let specialOffer = await SpecialOffers.findOne({
    //     where: { id: req.params.id },
    // });

    let packages = await Packages.findOne({
        where: { id: req.params.id },
    });
    // if (specialOffer) {
    //     let chart = await Charts.create({
    //         title: specialOffer.title,
    //         description: specialOffer.description,
    //         price: specialOffer.price,
    //         image: specialOffer.image,
    //         category: specialOffer.category,
    //         duration: specialOffer.duration,
    //         createdBy: specialOffer.createdBy,
    //         specialOffer_Id: specialOffer.id,
    //         companyId: specialOffer.company_Id,
    //     });
    //     await user.addChart(chart);
    //     res.status(200).json(chart);
    // } else if (packages) {
        let chart = await Charts.create({
            title: packages.title,
            description: packages.description,
            price: packages.price,
            image: packages.image,
            category: packages.category,
            duration: packages.duration,
            createdBy: packages.createdBy,
            package_Id: packages.id,
            companyId: packages.company_Id,
        });
        await user.addChart(chart);
        res.status(200).json(chart);
    }
// }

async function handleDelete(req, res) {
    let userId = req.user.id;
    let user = await Users.findOne({
        where: { id: userId },
        include: Charts
    })
    const paramsId = req.params.id;
    let chartId = await user.charts.map((chart) => {
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
