'use strict';

const purchaseModel = (sequelize, DataTypes) => {
  const purchase = sequelize.define('purchase', {
    userName: {
      type: DataTypes.STRING,
      required: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    packageTitle: {
      type: DataTypes.STRING,
      required: true,
    },
    packageId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  return purchase;
}

module.exports = purchaseModel;
