'use strict';
const {
    Users
} = require('../../models/models.connection');
const {
    Companies
} = require('../../models/models.connection');
const express = require('express')
const signupRoutes = express.Router();
const {
    v4: uuidv4
} = require('uuid');

signupRoutes.post('/user/signup', handleSignup);
async function handleSignup(req, res, next) {
    try {
        const user = req.body
        if (Object.keys(user).length === 0) { }
        let x = user.displayName;
        if (x.length === 0) {
            res.status(403).send('no data entered')
        }
        let UuCode = uuidv4();

        var hashed = await Users.beforeCreate(user);
        let userRecord = await Users.create({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hashed,
            role: req.body.role,
            uuCode: UuCode
        });

        let mailed = await Users.sendEmail(user);
        const output = {
            displayName: userRecord.displayName,
            email: userRecord.email,
            isVerify: userRecord.isVerify,
            role: userRecord.role,
            createdAt: userRecord.createdAt,
            updatedAt: userRecord.updatedAt,
        };
        res.status(201).json(output);
    } catch (e) {
        next(e);
    }
}

signupRoutes.post('/companies/signup', handleSignupCompanies);
async function handleSignupCompanies(req, res, next) {
    try {
        const user = req.body;
        if (Object.keys(user).length === 0) { }
        let x = req.body.displayName;
        if (x.length === 0) {
            res.status(403).send('no data entered')
        }
        let roomCode = uuidv4();
        let UuCode = uuidv4();
        var hashed = await Companies.beforeCreate(user);
        let userRecord = await Companies.create({
            displayName: req.body.displayName,
            email: req.body.email,
            location: req.body.location,
            password: hashed,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            uuCode: UuCode,
            roomId: roomCode
        });
        let mailed = await Companies.sendEmail(user);
        const output = {
            displayName: userRecord.displayName,
            email: userRecord.email,
            location: userRecord.location,
            phoneNumber: userRecord.phoneNumber,
            isVerify: userRecord.isVerify,
            role: userRecord.role,
            roomId: userRecord.roomId,
            createdAt: userRecord.createdAt,
            updatedAt: userRecord.updatedAt
        };
        res.status(201).json(output);
    } catch (e) {
        next(e);
    }
}
module.exports = signupRoutes;