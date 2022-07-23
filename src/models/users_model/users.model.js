'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const userModel = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client'),
      required: true,
      defaultValue: 'client',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(value) {
        let token = jwt.sign(value, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          admin: ['read', 'create', 'update', 'delete'],
          user: ['read'],
        };
        return acl[this.role];
      }
    }
  });

  users.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  users.authenticateBasic = async (username, password) => {
    let user = await user.findOne({ where: { username: username } });
    if (!user) {
      return 'Invalid username';
    }
    let passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return 'Invalid password';
    }
    return user;
  };

  users.authenticateToken = async (token) => {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await user.findOne({ where: { username: parsedToken.username } });
      if (!user) {
        return 'Invalid token';
      }
      return user;
    } catch (err) {
      return 'Invalid token';
    }
  };

  return users;
}
module.exports = userModel;
