'use strict';

require('dotenv').config();
const server = require('./src/server');
const { db } = require('./src/models/models.connection');

db.sync().then(() => {
  server.start(process.env.PORT);
}).catch(err => {
  console.log(err);
});