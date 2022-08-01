'use strict';
const express = require('express');
require('dotenv').config();
const { SpecialOffers } = require('../models/models.connection');
const bearer = require('../middleware/bearer');
const checkCompany = require('../middleware/checkCompany');
const { Companies } = require('../models/models.connection');
const nodemailer = require('nodemailer');
const homeRoute = express.Router();
const { Packages } = require('../models/models.connection');

homeRoute.get('/packages', getPackages);
async function getPackages(req, res) {
    let allPackages = await Packages.findAll({
        where: {
            published: true,
            rejected: false,
            specialOffer: false
        }
    });
    res.status(200).json(allPackages);
}

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    }
  });
  
  homeRoute.post("/contact", (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: name,
      to: "salehziad1999@gmail.com",
      subject: "Contact Form Submission - Portfolio",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, status: "Message Sent" });
      }
    });
  });
homeRoute.get('/specialOffers', getspecialOffers);
async function getspecialOffers(req, res) {
    let allPackages = await Packages.findAll({
        where: {
            published: true,
            rejected: false,
            specialOffer: true
        }
    });
    res.status(200).json(allPackages);
}

module.exports = homeRoute;