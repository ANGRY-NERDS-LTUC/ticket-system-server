'use strict';

const express = require('express');
const notFound = require('./error/404');
const errorHandler = require('./error/500');

const app = express();
app.use(express.json());


app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}