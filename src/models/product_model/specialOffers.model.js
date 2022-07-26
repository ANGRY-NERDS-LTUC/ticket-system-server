'use strict';

const specialOffersModel = (sequelize, DataTypes) => {
  const specialOffers = sequelize.define('specialOffers2', {
    company_Id: {
      type: DataTypes.INTEGER,
      required: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    category: {
      type: DataTypes.STRING,
      required: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      required: true,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'serviceProvider'),
      required: true,
      defaultValue: 'client',
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          admin: ['read', 'create', 'update', 'delete'],
          client: ['read'],
          serviceProvider: ['read', 'create', 'update']
        };
        return acl[this.role];
      }
    }
  });
  return specialOffers;
}

module.exports = specialOffersModel;