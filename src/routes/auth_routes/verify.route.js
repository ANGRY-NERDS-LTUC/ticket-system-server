'use strict';
const {
    Users
} = require('../../models/models.connection');
const {
    Companies
} = require('../../models/models.connection');
const express = require('express');
const verifyRoute = express.Router();
verifyRoute.post('/verify', verifyCode);
async function verifyCode(req, res, next) {
    try {
        let code = req.body.code;
        let user = await Users.findOne({
            where: {
                uuCode: code
            }
        })
        let company = await Companies.findOne({
            where: {
                uuCode: code
            }
        });
        let usercode = null
        if (!user) {
            usercode = company.uuCode
            if (code === usercode) {
                let newUser = await Companies.update({
                    isVerify: 'true'
                }, {
                    where: {
                        displayName: company.displayName
                    }
                })
                if (newUser) {
                    res.send('verified')
                    next();
                }
            }
        }
        if (!company) {
            usercode = user.uuCode
            if (code === usercode) {
                let newUser = await Users.update({
                    isVerify: 'true'
                }, {
                    where: {
                        displayName: user.displayName
                    }
                })
                if (newUser) {
                    res.send('verified')
                    next();
                }
            }
        }
    } catch (e) {
        res.status(500).send(`the code is not correct`)
        console.log(e);
    }
}
module.exports = verifyRoute