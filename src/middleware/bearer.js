'use strict';

const {
    Users
} = require("../models/models.connection");
const {
    Companies
} = require("../models/models.connection");


async function bearer(req, res, next) {
    const token = req.headers.authorization.split(' ').pop();

    try {
        if (req.query.type == 'client') {
            let x = await Users.authenticateToken(token);
            if (!req.headers.authorization) {
                next('Invalid Login')
            }
            req.user = x;
            next();
        } else if (req.query.type == 'company') {
            let x = await Companies.authenticateToken(token);
            if (!req.headers.authorization) {
                next('Invalid Login 1 ')
            }
            req.user = x;
            next();
        }

    } catch (e) {
        res.status(403).send('Invalid Login 2');
    }

}

module.exports = bearer;