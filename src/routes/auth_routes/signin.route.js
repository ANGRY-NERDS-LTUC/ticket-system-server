'use strict';
// const {
//     Users
// } = require('../../models/models.connection');
const express = require('express');
const signinRoute = express.Router();
const basic = require('../../middleware/basic')
const {
    SignInLogs
} = require('../../models/models.connection');
console.log({
    SignInLogs
})
signinRoute.post('/login', basic, handleSignin);
async function handleSignin(req, res, next) {
    try {
        const user = {
            user: req.user,
            token: req.user.token,
            type: req.type
        };
        let verivied = req.user.isVerify;
        if (verivied === true) {
            let logs = await SignInLogs.create({
                title: `user ${user.user.displayName} logged in `,
                name: user.user.displayName,
                email: user.user.email,
                role: user.user.role,
                type: user.user.type,
                date: new Date().toJSON()
            });
            res.status(200).json(user);
        } else {
            res.send('email did not verified please check your email')
        }

    } catch (e) {
        console.log(e)
        next(e);
    }
}

const {
    Users
} = require('../../models/models.connection');
signinRoute.post('/send/forgetPassword', handleForgetPassword);
async function handleForgetPassword(req, res) {
    let email = req.body.email;
    let user = await Users.findOne({
        where: {
            email
        }
    });
    await Users.forgetEmail(user)
    // console.log(user.email);
    // console.log("before",user.password);
    // user.password=password;
    // console.log("after",user.password);
    // var hashed = await Users.beforeCreate(user);
    // let updated=await Users.update({password:hashed},{where:{email}});
    res.send(user)
}

signinRoute.post('/hendle/forgetPassword', handleChangePassword);
async function handleChangePassword(req, res) {
    let password = req.body.password;
    let token = req.query.token;
    let user = await Users.findOne({
        where: {
            password: token
        }
    });
    user.password = password;
    let hashed = await Users.beforeCreate(user);
    let updated = await Users.update({
        password: hashed
    }, {
        where: {
            email: user.email
        }
    });
    res.send(updated)
}


const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const checkCompany = require('../../middleware/checkCompany');
// const { Users } = require('../../models/models.connection');
const {
    Companies
} = require('../../models/models.connection');
const {
    uuid
} = require('uuidv4');

// signinRoute.get('/companies', bearer, checkCompany(), async (req, res) => { //localhost:5000/auth/companies?type=company
//     //req.user.id;    
//     let user = await Companies.findAll()
//     res.send(user)
// })


signinRoute.get('/users', bearer, checkUser(), async (req, res) => { // localhost:5000/auth/users?type=client
    let user = await Users.findAll()
    res.send(user)
})
module.exports = signinRoute;