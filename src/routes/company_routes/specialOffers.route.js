'use strict';

const express = require('express');
const { SpecialOffers } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const { Companies } = require('../../models/models.connection');
const SpecialOfferRoute = express.Router();

SpecialOfferRoute.get('/SpecialOffer', bearer, checkCompany(), handleGetAll);
SpecialOfferRoute.post('/SpecialOffer', bearer, checkCompany(), handleCreate);
SpecialOfferRoute.delete('/SpecialOffer/:id', bearer, checkCompany(), handleDelete);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allSpecialOffers = await Companies.findOne({
        where: { id: userId },
        include: SpecialOffers
    });
    res.status(200).json(allSpecialOffers);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    obj.company_Id = user.id;
    obj.createdBy = req.user.displayName;
    let createdOffers = await SpecialOffers.create(obj);
    await user.addSpecialoffer(createdOffers);
    res.status(201).json(createdOffers);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    const companyId = req.user.id;
    await SpecialOffers.destroy({
        where: {
            id: id,
            company_Id: companyId
        },
    });
    res.status(204).send('Package successfully deleted');
}


module.exports = SpecialOfferRoute;