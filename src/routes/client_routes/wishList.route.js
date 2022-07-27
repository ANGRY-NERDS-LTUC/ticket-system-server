'use strict';

const express = require('express');
const { WishList } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const { Users } = require('../../models/models.connection');
const wishListRoute = express.Router();

wishListRoute.get('/wishlist', bearer, checkUser(), handleGetAll);
wishListRoute.post('/wishlist', bearer, checkUser(), handleCreate);
wishListRoute.delete('/wishlist/:id', bearer, checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allwishListPackages = await Users.findOne({
        where: { id: userId},
        include: WishList
    });
    res.status(200).json(allwishListPackages);
}

async function handleCreate(req, res) {
    let user = req.user;
    let obj = req.body;
    let createdwishListPackage = await WishList.create(obj);
    await user.addWishList(createdwishListPackage);
    res.status(201).json(createdwishListPackage);
}

async function handleDelete(req, res) {
    let userId = req.user.id;
    let user = await Users.findOne({
        where: {id: userId},
        include: WishList
    })
    const paramsId = req.params.id;
    let wishListId = await user.wishLists.map( (wishlist) => {
        if (paramsId == wishlist.id) {
            WishList.destroy({
                where: { id: paramsId },
            })
            return 'package successfully deleted';
        } 
    });
    res.status(200).send(wishListId);
}

module.exports = wishListRoute;
