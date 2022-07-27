'use strict';

const express = require('express');
const { SpecialOffers } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const { Companies } = require('../../models/models.connection');
const homeRoute = express.Router();

homeRoute.get('/specialOffer', bearer, checkCompany(), handleGetAll);
homeRoute.post('/specialOffer', bearer, checkCompany(), handleCreate);
homeRoute.delete('/specialOffer/:id', bearer, checkCompany(), handleDelete);

async function handleGetAll(req, res) {
    let SpecialOffersId = req.user.id;
    let allSpecialOffers = await Companies.findOne({
        where: { id: SpecialOffersId },
        include: SpecialOffers
    });
    res.status(200).json(allSpecialOffers);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    let createdSpecialOffer = await SpecialOffers.create(obj);
    await user.addSpecialOffer(createdSpecialOffer);
    res.status(201).json(createdSpecialOffer);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    await SpecialOffers.destroy({
        where: { id: id },
    });
    res.status(204).send('Package successfully deleted');
}

module.exports = homeRoute;




















// "use strict";
// const express = require("express");


// const { SpecialOffers } = require("../models/models.connection");


// const specialOfferRouter = express.Router();
// //add routes
// specialOfferRouter.get("/specialOffer", getSpecialOffer);

// specialOfferRouter.get("/specialOffer/:id", getOneSpecialOffer);
// specialOfferRouter.post("/specialOffer", createSpecialOffer);
// specialOfferRouter.put("/specialOffer/:id", updateSpecialOffer);
// specialOfferRouter.delete("/specialOffer/:id", deleteSpecialOffer);
// // to add functionality we need to add
// async function getSpecialOffer(req, res) {
//     let specialoffers = await SpecialOffers.getAll();
//     res.status(200).json(specialoffers);
// }
// //if we want to find one

// async function getOneSpecialOffer(req, res) {
//     const specialOfferId = parseInt(req.params.id);
//     let specialOffer = await SpecialOffers.get(specialOfferId);
//     res.status(200).json(specialOffer);
// }

// // for adding new record
// async function createSpecialOffer(req, res) {
//     let newSpecialOffer = req.body;
//     console.log('newSpecialOffer', newSpecialOffer);
//     let specialOffer = await SpecialOffers.create(newSpecialOffer);
//     res.status(201).json(specialOffer);
// }

// async function updateSpecialOffer(req, res) {
//     let specialOfferId = parseInt(req.params.id);
//     let updatespecialOffer = req.body;
//     console.log("updatespecialOffer", updatespecialOffer);
//     let foundSpecialOffer = await SpecialOffers.get(specialOfferId);
//     console.log("foundSpecialOffer", foundSpecialOffer);
//     if (foundSpecialOffer) {
//         let updatedSpecialOffer = await foundSpecialOffer.update(specialOfferId, updatespecialOffer);
//         res.status(201).json(updatedSpecialOffer);
//     }
// }

// async function deleteSpecialOffer(req, res) {

//     let specialOfferId = parseInt(req.params.id);
//     let deleteSpecialOffer = await SpecialOffers.delete(specialOfferId)
//     res.status(204).json(deleteSpecialOffer);

// }
// module.exports = specialOfferRouter;