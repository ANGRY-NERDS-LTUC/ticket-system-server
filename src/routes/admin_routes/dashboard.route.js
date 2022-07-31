'use strict';
const express = require('express');
const adminRoutes = express.Router();
const {
    Users
} = require('../../models/models.connection');
const {
    Companies
} = require('../../models/models.connection');
const {
    SignInLogs
} = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const checkAdmin = require('../../middleware/checkAdmin');
const {
    Packages
} = require('../../models/models.connection');
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

// delete one company
adminRoutes.delete('/company/delete', bearer, checkUser(), checkAdmin(), deleteUser);
async function deleteUser(req, res) {
    let id = req.query.id;
    let deleted = await Companies.destroy({
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
adminRoutes.get('/logs/signin', bearer, checkUser(), checkAdmin(), getSignInLos);
async function getSignInLos(req, res) {
    let record = await SignInLogs.findAll();
    res.send(record);
}

// get all packages
adminRoutes.get('/package', bearer, checkUser(), checkAdmin(), getAllPackages);
async function getAllPackages(req, res) {
    let record = await Packages.findAll();
    res.send(record);
}

// get published packages
adminRoutes.get('/package/published', bearer, checkUser(), checkAdmin(), getPublishedPackeges);
async function getPublishedPackeges(req, res) {
    let record = await Packages.findAll({
        where: {
            published: true
        }
    });
    res.send(record);
}

// get not published packages
adminRoutes.get('/package/notpublished', bearer, checkUser(), checkAdmin(), getNotPublishedPackages);
async function getNotPublishedPackages(req, res) {
    let record = await Packages.findAll({
        where: {
            published: false
        }
    });
    res.send(record);
}

// accept packages
adminRoutes.get('/package/accept', bearer, checkUser(), checkAdmin(), acceptPackage);
async function acceptPackage(req, res) {
    let packageId = req.query.id;
    let company_Id = req.user.id;
    let published1 = await Packages.update({
        published: true,
        rejected: false
    }, {
        where: {
            id: packageId,
        }
    });

    res.send("published1")
}

// regect packages
adminRoutes.post('/package/regect', bearer, checkUser(), checkAdmin(), rejectPackage);
async function rejectPackage(req, res) {
    let packageId = req.query.id;
    let {
        rejectedTitle
    } = req.body;
    let published = await Packages.update({
        published: true,
        rejected: true,
        rejectedTitle
    }, {
        where: {
            id: packageId,
        }
    });
    res.send(published)
}

// get rejected packeges
adminRoutes.get('/package/regect', bearer, checkUser(), checkAdmin(), getRejectPackage);
async function getRejectPackage(req, res) {
    let published = await Packages.findAll({
        where: {
            rejected: true,
        }
    });
    res.send(published)
}

// delete packege
adminRoutes.delete('/package/delete', bearer, checkUser(), checkAdmin(), deletePackege);
async function deletePackege(req, res) {
    let packageId = req.query.id;
    let deleted = await Packages.destroy({
        where: {
            id: packageId
        }
    });
    deleted == 1 ? res.send('deleted') : res.send('can not delete user');
}







module.exports = adminRoutes;