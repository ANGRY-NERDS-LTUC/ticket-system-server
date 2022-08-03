'use strict';

const express = require('express');
const { Carts } = require('../../models/models.connection');
const { Packages } = require('../../models/models.connection');
const bearer = require('../../middleware/bearer');
const checkUser = require('../../middleware/checkUser');
const { Users } = require('../../models/models.connection');
const cartRoute = express.Router();

cartRoute.get('/cart', bearer, checkUser(), handleGetAll);
cartRoute.post('/cart/:id', bearer, checkUser(), handleCreate);
cartRoute.delete('/cart/:id', bearer, checkUser(), handleDelete);

async function handleGetAll(req, res) {
    let userId = req.user.id;
    let allCarts = await Users.findOne({
        where: {
            id: userId
        },
        include: Carts
    })
    res.status(200).json(allCarts);
}

async function handleCreate(req, res) {
    let user = req.user;
    let packages = await Packages.findOne({
        where: {
            id: req.params.id
        },
    });
    let cart = await Carts.create({
        title: packages.title,
        description: packages.description,
        price: packages.price,
        image: packages.image,
        category: packages.category,
        duration: packages.duration,
        createdBy: packages.createdBy,
        package_Id: packages.id,
        companyId: packages.company_Id,
    });
    await user.addCart(cart);
    res.status(200).json(cart);
}

async function handleDelete(req, res) {
    let userId = req.user.id;
    let user = await Users.findOne({
        where: {
            id: userId
        },
        include: Carts
    })
    const paramsId = req.params.id;
    let cartId = await user.Carts.map((cart) => {
        if (paramsId == cart.id) {
            Carts.destroy({
                where: {
                    id: paramsId
                },
            })
            return 'package successfully deleted';
        }
    });
    res.status(200).send(cartId);
}

module.exports = cartRoute;