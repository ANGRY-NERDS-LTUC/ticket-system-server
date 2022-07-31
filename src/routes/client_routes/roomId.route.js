'use strict';

const express = require('express');
const { Companies } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const roomIdRoute = express.Router();

roomIdRoute.get('/roomid', bearer, checkUser, handleGetAll);

function handleGetAll(req, res) {
  let allCompaniesRoomId = Companies.findAll({
    attributes: ['displayName', 'roomId'],
  });
  res.status(200).json(allCompaniesRoomId);
}

module.exports = roomIdRoute;