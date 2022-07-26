'use strict';

const packagesModel = (sequelize, DataTypes) => {
  const packages = sequelize.define('packages', {
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
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rejectedTitle: {
      type: DataTypes.STRING,
      required: false,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    },
    specialOffer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return packages;
}

module.exports = packagesModel;