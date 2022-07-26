'use strict';
const base64 = require('base-64');
const {
  Users
} = require('../models/models.connection');
const {
  Companies
} = require('../models/models.connection');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("ggggggggggggggggg");
    next()
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [displayName, pass] = base64.decode(basic).split(':');
  console.log(basic, displayName, pass);
  let user = await Users.findOne({
    where: {
      displayName: displayName
    }
  })
  let company = await Companies.findOne({
    where: {
      displayName: displayName
    }
  });
  console.log("user", user);
  console.log('company', company);

  try {
    if (user === null) {
      req.user = await Companies.authenticateBasic(displayName, pass)
      req.type='company'
    }
    if (company === null) {
      req.user = await Users.authenticateBasic(displayName, pass)
      req.type='client'
    }
    console.log(req.user, displayName, pass);
    console.log("ddddd");
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
}