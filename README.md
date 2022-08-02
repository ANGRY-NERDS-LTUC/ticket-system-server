# Ticket-System-Server (ticketcom)

## Angry Nerds Group

## Name of group members

1. Bahaa Nimer (Team Leader)
2. Saleh Ziad
3. Mohammad Haimour
4. Ahmad Tayseer
5. Ahamd Helwa

## description of the project

This project is an ecommerce website consider as a link between service providers and clients.

This website provide tickets for tourism trips that companies present, then the clients can look at them, book and purchase.

And the website provide a service for the users to contact the support team for any problems that may face them.

## Configuration

- README.md - contains documentation
- .env - contains env variables (should be git ignored)
- .gitignore - contains a .gitignore file
- package.json - contains npm package config
    - create a test script for running tests
    - create a start script for running your server
- index.js - the entry point for your application
- src/ - contains your core application files and folders and server file which contains the main server
- __test__/ - contains unit tests
- asset - contains images
- client - contains files for chat system
- notification - contain files for notification system

## Dependecies

```js
{
    "base-64": "^1.0.0",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jest": "^28.1.3",
    "jsonwebtoken": "^8.5.1",
    "nodemailer": "^6.7.7",
    "pg": "^8.7.3",
    "sequelize": "^6.21.3",
    "sequelize-cli": "^6.4.1",
    "socket.io": "^4.5.1",
    "sqlite3": "^5.0.10",
    "supertest": "^6.2.4",
    "uuid": "^8.3.2",
    "uuidv4": "^6.2.13"
}
```

## Authrization

clients - READ

companies - READ/CREATE/UPDATE

admins - READ/CREATE/UPDATE/DELETE

## Routes


## Auth Routes

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    POST     |  /auth/user/signup                           | Signup client account    |
|    POST     |  /auth/companies/signup                           | Signup company account    |
|    POST     |  /auth/verify                                      | verify account    |
|    POST     |  /auth/login                                       |     Signin account    |
|    POST     |  /auth/send/forgetPassword                         |     forget password    |
|    POST     |  /auth/hendle/forgetPassword?token=tokenValue      |     update password    |
|    GET     |  /auth/users   |     get user    |

## Admin Routes

### Packages

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /admin/package/accept?type=client&id=idForThePackage| accept package to publish |
|    GET     |  /admin/package?type=client                         | get all packages  |
|    GET     |  /admin/package/published?type=client         | get published packages   |
|    GET     |  /admin/package/notpublished?type=client      |     get not published packages |
|    POST     |  /admin/package/reject?type=client&id=idForThePackage  | reject package |
|    GET     |  /admin/package/reject?type=client     |     get rejected packages |
|    DELETE     |  /admin/package/delete?type=client&id=idForThePackage |  delete package |
|    GET     |  /admin/package/purchase?type=client |  get all purchased packages |

### Users

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /admin/users?type=client   | get all users |
|    DELETE     |  /admin/user/delete?type=client&id=idForTheUser      | delete user  |
|    DELETE     |  /admin/company/delete?type=client&id=idForTheCompany  | delete company   |

### Logs

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /admin/logs/signin?type=client  | sign-in logs |

## Company Routes

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    CREATE     |  /company/create?type=company | create a package or special offer |
|    DELETE     |  /company/package/delete/idForTheCompany?type=company  | delete company account  |
|    GET     |  /company/packages?type=company  | get all packages for company   |
|    GET     |  /company/packages/accepted?type=company  | get accepted packages for company   |
|    GET     |  /company/packages/rejected?type=company  | get rejected packages for company   |

## User Routes

### Chart

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    CREATE     |  /client/chart/:idForPAckage?type=client | put a package on chart |
|    DELETE     |  /client/chart/:idForPAckage?type=client | remove package from chart  |
|    GET     |  /client/chart?type=client  | get all packages in chart   |

### WishList

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    CREATE     |  /client/wishlist/:idForPAckage?type=client | put a package on wishlist |
|    DELETE     |  /client/wishlist/:idForPAckage?type=client | remove package from wishlist  |
|    GET     |  /client/wishlist?type=client  | get all packages in wishlist   |

### Chat

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /client/roomid?type=client | get rooms id for chatting with companies |

### Packages

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /client/packages?type=client | get all packages |


### Special Offers

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /client/specialOffers?type=client | get all special offers packages |

## Home Routes

| method      |                      path           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    GET     |  /home/packages | get all packages |
|    GET     |  /home/specialOffers | get all special offers packages |

## Installation

ticket-system-server requires Node.js v14+ to run.

Install the dependencies and devDependencies and start the server.

    cd ticket-system-server
    npm i
    npm start

For production environments...

    NODE_ENV=production node index

## License

MIT




## UML Diagram

![Mid Project](./asset/UML.MidProject.png)

## DataBase Diagram

![Relations](./asset/database-diagram.png)