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
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    }
  });
  return packages;
}

module.exports = packagesModel;