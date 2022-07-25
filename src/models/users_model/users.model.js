'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config();
const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('client1', {
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'client'),
            defaultValue: 'client',
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({
                    displayName: this.displayName
                }, process.env.SECRET);
            }
        }, //new
        uuCode: {
            type: DataTypes.STRING,
            required: true,
        },
        isVerify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        actions: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    client: ['read'],
                    admin: ['read', 'create', 'update', 'delete'],
                }
                return acl[this.role];
            }
        },
        // photos:{
        //   type:DataTypes.STRING,
        //   defaultValue:"https://lh3.googleusercontent.com/a/AItbvmmaqLrLZidPVZn_0Q6pP-hap-qUNHdo92tMyFNx=s96-c"
        // }
    });

    model.beforeCreate = async function (user) {
        let hashedPass = await bcrypt.hash(user.password, 10);
        return hashedPass;
    };

    model.sendEmail = async function (user) {
        const email = user.email;
        let userMail = await this.findOne({
            where: {
                email: email
            }
        })
        let code = userMail.uuCode;
        console.log('email', {
            code
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS 
            },
            port: 465,
            host: 'stmp.gmail.com'
        })
        const msg = {
            from: 'salehziad1999@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Sign Up validation", // Subject line
            text: `Long time no see welcome to our server use this code ${code} to verify your email here 'https://salehziad-projects.netlify.app/verify'`, // plain text body
        }
        const info = await transporter.sendMail(msg);
        console.log({info});
    }

    model.authenticateBasic = async function (displayName, password) {
        const user = await this.findOne({
            where: {
                displayName: displayName
            }
        });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            return user;
        }
        throw new Error('Invalid User');
    }

    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, process.env.SECRET);
            const user = await this.findOne({
                where: {
                    displayName: parsedToken.displayName
                }
            });
            if (user) {
                return user;
            }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    }

    return model;
}

module.exports = userModel;

// 'use strict';

// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET || 'secret';

// const userModel = (sequelize, DataTypes) => {
//   const users = sequelize.define('users', {
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
//       type: DataTypes.ENUM('admin', 'client'),
//       required: true,
//       defaultValue: 'client',
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
//           user: ['read'],
//         };
//         return acl[this.role];
//       }
//     }
//   });

//   users.beforeCreate(async (user) => {
//     let hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//   });

//   users.authenticateBasic = async (username, password) => {
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

//   users.authenticateToken = async (token) => {
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

//   return users;
// }
// module.exports = userModel;