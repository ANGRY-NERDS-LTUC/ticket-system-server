'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users_model/users.model');
const companyModel = require('./users_model/company.model');
const chartModel = require('./product_model/chart.model');
const packagesModel = require('./product_model/packages.model');
const specialOffersModel = require('./product_model/specialOffers.model');
const wishListModel = require('./product_model/wishList.model');
const Collection = require('./lib/collection.model');
const { options } = require('../routes/auth_routes/signup.route');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};

const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions)
sequelize.options.logging=false;
const users = userModel(sequelize, DataTypes);
const companies = companyModel(sequelize, DataTypes);
const charts = chartModel(sequelize, DataTypes);
const packages = packagesModel(sequelize, DataTypes);
const specialOffers = specialOffersModel(sequelize, DataTypes);
const wishList = wishListModel(sequelize, DataTypes);



users.belongsToMany(packages, { through: 'user_packages' });
packages.belongsToMany(users, { through: 'user_packages' });

users.belongsToMany(charts, { through: 'user_chart' });
charts.belongsToMany(users, { through: 'user_chart' });

users.belongsToMany(specialOffers, { through: 'user_specialOffers' });
specialOffers.belongsToMany(users, { through: 'user_specialOffers' });

users.belongsToMany(wishList, { through: 'user_wishList' });
wishList.belongsToMany(users, { through: 'user_wishList' });

companies.hasMany(packages, { foreignKey: 'company_Id' });
packages.belongsTo(companies);

companies.hasMany(specialOffers, { foreignKey: 'company_Id' });
specialOffers.belongsTo(companies);


module.exports = {
  db: sequelize,
  Users: users,
  Companies: companies,
  Charts: new Collection(charts),
  Packages: new Collection(packages),
  SpecialOffers: new Collection(specialOffers),
  WishList: new Collection(wishList),
}