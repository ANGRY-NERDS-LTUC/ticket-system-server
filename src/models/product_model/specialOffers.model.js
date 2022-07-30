'use strict';

const specialOffersModel = (sequelize, DataTypes) => {
  const specialOffers = sequelize.define('specialoffer', {
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
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  return specialOffers;
}

module.exports = specialOffersModel;