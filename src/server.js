'use strict';

const express = require('express');
const signupRoutes=require('./routes/auth_routes/signup.route');
const verifyRoute=require('./routes/auth_routes/verify.route');
const signinRoute=require('./routes/auth_routes/signin.route');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(
  cors({
    origin:"http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use('/auth',signupRoutes);
app.use('/auth',verifyRoute);
app.use('/auth',signinRoute)
const notFound = require('./error/404');
const errorHandler = require('./error/500');

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