'use strict';

const express = require('express');
const { Companies } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const roomIdRoute = express.Router();

roomIdRoute.get('/roomid', bearer, checkUser(), handleGetAll);

async function handleGetAll(req, res) {
  let allCompaniesRoomId = await Companies.findAll();
  let output = allCompaniesRoomId.map(company => {
    return {
      displayName: company.displayName,
      roomId: company.roomId,
    };
  });
  res.status(200).json(output);
}

module.exports = roomIdRoute;