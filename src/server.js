'use strict';

const express = require('express');
//const packageRouter = require('./routes/company_routes/form.route')
const notFound = require('./error/404');
const errorHandler = require('./error/500');

const app = express();
app.use(express.json());
//app.use(packageRouter);


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