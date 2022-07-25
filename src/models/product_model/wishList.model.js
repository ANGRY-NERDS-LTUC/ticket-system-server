'use strict';

const wishListModel = (sequelize, DataTypes) => {
  const wishList = sequelize.define('wishList', {
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
    role: {
      type: DataTypes.ENUM('admin', 'client'),
      required: true,
      defaultValue: 'client',
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          admin: ['read', 'create', 'update', 'delete'],
          client: ['read', 'create', 'delete'],
        };
        return acl[this.role];
      }
    }
  });

  return wishList;
}

module.exports = wishListModel;