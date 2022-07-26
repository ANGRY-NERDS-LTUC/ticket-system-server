'use strict';
// const {
//     Users
// } = require('../../models/models.connection');
const express = require('express');
const signinRoute = express.Router();
const basic = require('../../middleware/basic')
signinRoute.post('/login', basic, handleSignin)

async function handleSignin(req, res, next) {
    try {
        const user = {
            user: req.user,
            token: req.user.token,
            type: req.type
        };
        let verivied = req.user.isVerify;
        if (verivied === true) {
            // let logs = await signInUsers.create({
            //     title: `user ${user.user.displayName} logged in `,
            //     name: user.user.displayName,
            //     email: user.user.email,
            //     role: user.user.role,
            //     method: "local",
            //     date: new Date().toJSON()
            // })
            // console.log({
            //     logs
            // })
            res.status(200).json(user);
        } else {
            res.send('email did not verified please check your email')
        }

    } catch (e) {
        next(e);
    }
}



const bearer = require('../../middleware/bearer');
signinRoute.get('/', bearer, (req, res) => {
    res.send('done')
})

module.exports = signinRoute;