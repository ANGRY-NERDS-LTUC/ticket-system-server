'use strict';

const express = require('express');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const { Companies } = require('../../models/models.connection');
const formRoute = express.Router();

formRoute.get('/packages', bearer, checkCompany(), handleGetAll);
formRoute.post('/packages', bearer, checkCompany(), handleCreate);
formRoute.delete('/packages/:id', bearer, checkCompany(), handleDelete);

async function handleGetAll(req, res) {
    let packageId = req.user.id;
    let allPackages = await Companies.findOne({
        where: { id: packageId },
        include: Packages
    });
    res.status(200).json(allPackages);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    let createdPackage = await Packages.create(obj);
    await user.addPackage(createdPackage);
    res.status(201).json(createdPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    await Packages.destroy({
        where: { id: id },
    });
    res.status(204).send('Package successfully deleted');
}

module.exports = formRoute;
//-_______________________________


// 'use strict';

// const express = require('express');
// const { Charts } = require('../../models/models.connection');
// const bearer = require('../../middleware/bearer');
// const checkUser = require('../../middleware/checkUser');
// const { Users } = require('../../models/models.connection');
// const chartRoute = express.Router();

// chartRoute.get('/chart', bearer, checkUser(), handleGetAll);
// chartRoute.post('/chart', bearer, checkUser(), handleCreate);
// chartRoute.delete('/chart/:id', bearer, checkUser(), handleDelete);

// async function handleGetAll(req, res) {
//     let userId = req.user.id;
//     let allChartPackages = await Users.findOne({
//         where: { id: userId},
//         include: Charts
//     });
//     res.status(200).json(allChartPackages);
// }

// async function handleCreate(req, res) {
//     let user = req.user;
//     let obj = req.body;
//     let createdChartPackage = await Charts.create(obj);
//     await user.addChart(createdChartPackage);
//     res.status(201).json(createdChartPackage);
// }

// async function handleDelete(req, res) {
//     const id = req.params.id;
//     await Charts.destroy({
//         where: { id: id },
//     });
//     res.status(204).send('Package successfully deleted');
// }

// module.exports = chartRoute;




















//_______________________________________________
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