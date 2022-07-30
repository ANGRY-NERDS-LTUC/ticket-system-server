'use strict';

const express = require('express');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkCompany = require('../../middleware/checkCompany');
const { Companies } = require('../../models/models.connection');
const FormRoute = express.Router();

FormRoute.get('/form', bearer, checkCompany(), handleGetAll);
FormRoute.post('/form', bearer, checkCompany(), handleCreate);
FormRoute.delete('/form/:id', bearer, checkCompany(), handleDelete);

async function handleGetAll(req, res) {
  let userId = req.user.id;
  let allPackges = await Companies.findOne({
    where: { id: userId },
    include: Packages
  });
  res.status(200).json(allPackges);
}

async function handleCreate(req, res) {
  let user = req.user;
  let obj = req.body;
  obj.company_Id = user.id;
  obj.createdBy = req.user.displayName;
  let createdOffers = await Packages.create(obj);
  await user.addPackages(createdOffers);
  res.status(201).json(createdOffers);
}

async function handleDelete(req, res) {
  const id = req.params.id;
  const companyId = req.user.id;
  await Packages.destroy({
    where: {
      id: id,
      company_Id: companyId
    },
  });
  res.status(204).send('Package successfully deleted');
}


module.exports = FormRoute;