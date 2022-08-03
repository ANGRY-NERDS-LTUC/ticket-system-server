'use strict';

require('dotenv').config();
const {
  Sequelize,
  DataTypes
} = require('sequelize');
const userModel = require('./users_model/users.model');
const companyModel = require('./users_model/company.model');
const cartModel = require('./product_model/cart.model');
const packagesModel = require('./product_model/packages.model');
const wishListModel = require('./product_model/wishList.model');
const purchaseModel = require('./product_model/purchase.model')
const signInModel=require('./logs/sign-in-logs');
const { options } = require('../routes/auth_routes/signup.route');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production" ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};

const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions)
sequelize.options.logging = false;
const users = userModel(sequelize, DataTypes);
const companies = companyModel(sequelize, DataTypes);
const carts = cartModel(sequelize, DataTypes);
const packages = packagesModel(sequelize, DataTypes);
const wishList = wishListModel(sequelize, DataTypes);
const purchase = purchaseModel(sequelize, DataTypes);
const signInLogs=signInModel(sequelize, DataTypes);

users.belongsToMany(packages, {
  through: 'user_packages'
});
packages.belongsToMany(users, {
  through: 'user_packages'
});

users.belongsToMany(carts, {
  through: 'user_cart'
});
carts.belongsToMany(users, {
  through: 'user_cart'
});

users.belongsToMany(wishList, {
  through: 'user_wishList'
});
wishList.belongsToMany(users, {
  through: 'user_wishList'
});

companies.hasMany(packages, {
  foreignKey: 'company_Id',
  sourceKey: 'id'
});
packages.belongsTo(companies, {
  foreignKey: 'company_Id',
  sourceKey: 'id'
});

packages.hasMany(carts, {
  foreignKey: 'package_Id',
  sourceKey: 'id'
});
carts.belongsTo(packages, {
  foreignKey: 'package_Id',
  sourceKey: 'id'
});

packages.hasMany(wishList, {
  foreignKey: 'package_Id',
  sourceKey: 'id'
});
wishList.belongsTo(packages, {
  foreignKey: 'package_Id',
  sourceKey: 'id'
});



module.exports = {
  db: sequelize,
  Users: users,
  Companies: companies,
  SignInLogs: signInLogs,
  Carts: carts,
  Packages: packages,
  WishList: wishList,
  Purchase: purchase
}