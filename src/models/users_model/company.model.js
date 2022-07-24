// 'use strict';

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET || 'secret';

// const companyModel = (sequelize, DataTypes) => {
//   const company = sequelize.define('companies', {
//     username: {
//       type: DataTypes.STRING,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       required: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: DataTypes.ENUM('service_provider', 'admin'),
//       required: true,
//       defaultValue: 'service_provider',
//     },
//     token: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         return jwt.sign({ username: this.username }, SECRET);
//       },
//       set(value) {
//         let token = jwt.sign(value, SECRET);
//         return token;
//       }
//     },
//     capabilities: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         const acl = {
//           admin: ['read', 'create', 'update', 'delete'],
//           service_provider: ['read', 'create', 'update'],
//         };
//         return acl[this.role];
//       }
//     }
//   });

//   company.beforeCreate(async (user) => {
//     let hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//   });

//   company.authenticateBasic = async (username, password) => {
//     let user = await user.findOne({ where: { username: username } });
//     if (!user) {
//       return 'Invalid username';
//     }
//     let passwordIsValid = await bcrypt.compare(password, user.password);
//     if (!passwordIsValid) {
//       return 'Invalid password';
//     }
//     return user;
//   };

//   company.authenticateToken = async (token) => {
//     try {
//       const parsedToken = jwt.verify(token, SECRET);
//       const user = await user.findOne({ where: { username: parsedToken.username } });
//       if (!user) {
//         return 'Invalid token';
//       }
//       return user;
//     } catch (err) {
//       return 'Invalid token';
//     }
//   };

//   return company;
// }
// module.exports = companyModel;
