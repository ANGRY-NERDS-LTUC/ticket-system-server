
'use strict';

const {
    Users
} = require("../models/models.connection");
const {
    Companies
} = require("../models/models.connection");


async function bearer(req, res, next) {
    // console.log('zzzzzzzzzzzzzz',req.query.type);
    const token = req.headers.authorization.split(' ').pop();
    // let y = await Companies.authenticateToken(token);
    // console.log({token});
    // console.log({y})
    try {
        if (req.query.type == 'client') {
            // console.log("yyyyyyyyyyyy user")
            let x = await Users.authenticateToken(token);
            if (!req.headers.authorization) {
                next('Invalid Login')
            }
            req.user = x;
            next();
        }
        if (req.query.type == 'company') {
            // console.log('zzzzzzzzzzzzzz company')
            let x = await Companies.authenticateToken(token);
            if (!req.headers.authorization) {
                next('Invalid Login')
            }
            // console.log("lllllllllllllll",x)
            req.user = x;
            next();
        }

    } catch (e) {
        // console.error(e);
        res.status(403).send('Invalid Login');
    }
    console.log("done");
}

module.exports = bearer;




// 'use strict';

// const { Users } = require("../models/models.connection");
// const { Companies } = require("../models/models.connection");


// function bearer(req, res, next) {
//     if (req.headers.authorization) {
//         const bearerToken = req.headers.authorization.split(" ")[1]; 
//         if (Users) {
//             Users.findOne({
//                 where: {
//                     token: bearerToken
//                 }
//             }).then(user => {
//                 if (user) {
//                     req.user = user;
//                     next();
//                 } else {
//                     res.status(401).send({
//                         message: "Invalid token"
//                     });
//                 }
//             });
//         }
//         if (Companies) {
//             Companies.findOne({
//                 where: {
//                     token: bearerToken
//                 }
//             }).then(company => {
//                 if (company) {
//                     req.company = company;
//                     next();
//                 } else {
//                     res.status(401).send({
//                         message: "Invalid token"
//                     });
//                 }
//             }
//             );
//         }
//     } else {
//         res.status(401).send({
//             message: "No token provided"
//         });
//     }
// }

// module.exports = bearer;