'use strict';
const {
    Users
} = require('../../models/models.connection');
const {
    Companies
} = require('../../models/models.connection');
const express = require('express');
const verifyRoute = express.Router();
verifyRoute.post('/user/verify', verifyCode);
verifyRoute.post('/company/verify', verifyCodeCompany);

async function verifyCode(req, res, next) {
    try {
        let code = req.body.code;
        let user = await Users.findOne({
            where: {
                uuCode: code
            }
        });
        let usercode = user.uuCode;
        if (code === usercode) {
            console.log("yesssssssssssssssssssssssssss");
            let newUser = await Users.update({
                isVerify: 'true'
            }, {
                where: {
                    displayName: user.displayName
                }
            })
            console.log("sssssssssssssssss", newUser);
            if (newUser) {
                res.send('verified')
                next();
            }
        }
    } catch (e) {
        res.status(500).send(`the code is not correct`)
        console.log(e);
    }
}

async function verifyCodeCompany(req, res, next) {
    try {
        let code = req.body.code;
        let user = await Companies.findOne({
            where: {
                uuCode: code
            }
        });
        let usercode = user.uuCode;
        if (code === usercode) {
            console.log("yesssssssssssssssssssssssssss");
            let newUser = await Companies.update({
                isVerify: 'true'
            }, {
                where: {
                    displayName: user.displayName
                }
            })
            console.log("sssssssssssssssss", newUser);
            if (newUser) {
                res.send('verified')
                next();
            }
        }
    } catch (e) {
        res.status(500).send(`the code is not correct`)
        console.log(e);
    }
}
module.exports = verifyRoute