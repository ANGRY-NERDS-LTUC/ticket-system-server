'use strict';

const express = require('express');
//const packageRouter = require('./routes/company_routes/form.route')
const app = express();
app.use(express.json());
//app.use(packageRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}