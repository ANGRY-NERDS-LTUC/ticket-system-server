'use strict';

const express = require('express');
require('dotenv').config();
const { SpecialOffers } = require('../models/models.connection');
const bearer = require('../middleware/bearer');
const checkCompany = require('../middleware/checkCompany');
const { Companies } = require('../models/models.connection');
const nodemailer = require('nodemailer');
const homeRoute = express.Router();

homeRoute.get('/', handleGetAll);


async function handleGetAll(req, res) {
    // let SpecialOffersId = req.user.id;
    let allOffers = await SpecialOffers.findAll();
    res.status(200).json(allOffers);
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