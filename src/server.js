'use strict';

const express = require('express');
const signupRoutes=require('./routes/auth_routes/signup.route');
const verifyRoute=require('./routes/auth_routes/verify.route');
const signinRoute=require('./routes/auth_routes/signin.route');
const app = express();
app.use(express.json());
app.use('/auth',signupRoutes);
app.use('/auth',verifyRoute);
app.use('/auth',signinRoute)
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}