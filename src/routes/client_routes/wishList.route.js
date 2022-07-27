'use strict'; 

const express = require('express');
const { WishList } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const acl = require('../../middleware/acl');
const wishListRoute = express.Router();

wishListRoute.get('/wishList', bearer, acl('read'), checkUser(), handleGetAll);
wishListRoute.get('/wishList/:id', bearer, acl('read'), checkUser(), handleGetOne);
wishListRoute.post('/wishList', bearer, acl('create'), checkUser(), handleCreate);
wishListRoute.delete('/wishList/:id', bearer, acl('delete'), checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let allwishListPackages = await WishList.get();
    res.status(200).json(allwishListPackages);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let specificwishListPackage = await WishList.get(id);
    res.status(200).json(specificwishListPackage);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let createdwishListPackage = await WishList.create(obj);
    res.status(201).json(createdwishListPackage);
}

async function handleDelete(req, res) {
    const id = req.params.id;
    let deletedwishListPackage = await WishList.delete(id);
    res.status(204).json(deletedwishListPackage);
}

module.exports = wishListRoute;
