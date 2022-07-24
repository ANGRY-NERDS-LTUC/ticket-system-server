'use strict';

const { Users } = require("../models/models.connection");
const { Companies } = require("../models/models.connection");


function bearer(req, res, next) {
    if (req.headers.authorization) {
        const bearerToken = req.headers.authorization.split(" ")[1];
        if (Users) {
            Users.findOne({
                where: {
                    token: bearerToken
                }
            }).then(user => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
            });
        }
        if (Companies) {
            Companies.findOne({
                where: {
                    token: bearerToken
                }
            }).then(company => {
                if (company) {
                    req.company = company;
                    next();
                } else {
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
            }
            );
        }
    } else {
        res.status(401).send({
            message: "No token provided"
        });
    }
}

module.exports = bearer;