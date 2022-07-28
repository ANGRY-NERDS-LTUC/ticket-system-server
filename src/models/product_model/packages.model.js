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
  return packages;
}

module.exports = packagesModel;