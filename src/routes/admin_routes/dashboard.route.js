'use strict';
const express = require('express');
const adminRoutes = express.Router();
const {
    Users
} = require('../../models/models.connection');
const {SignInLogs}=require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const checkAdmin = require('../../middleware/checkAdmin');

// get all users
adminRoutes.get('/users', bearer, checkUser(), checkAdmin(), getAllUsers);
async function getAllUsers(req, res) {
    let record = await Users.findAll()
    res.send(record);
}

// delete one user
adminRoutes.delete('/user/delete', bearer, checkUser(), checkAdmin(), deleteUser);
async function deleteUser(req, res) {
    let id = req.query.id;
    let deleted = await Users.destroy({
        truncate: {
            cascade: true
        },
        where: {
            id
        }
    });
    deleted == 1 ? res.send('deleted') : res.send('can not delete user');
}

// get sign in logs
adminRoutes.get('/logs/signin',bearer,checkUser(),checkAdmin(),getSignInLos);
async function getSignInLos(req, res) {
    let record=await SignInLogs.findAll();
    res.send(record);
}











module.exports = adminRoutes;