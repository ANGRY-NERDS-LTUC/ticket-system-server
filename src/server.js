'use strict';

const express = require('express');
const signupRoutes = require('./routes/auth_routes/signup.route');
const verifyRoute = require('./routes/auth_routes/verify.route');
const signinRoute = require('./routes/auth_routes/signin.route');
const adminRoutes= require('./routes/admin_routes/dashboard.route');
const formRoute = require('./routes/company_routes/form.route');
const chartRoute = require('./routes/client_routes/chart.route');
const wishListRoute = require('./routes/client_routes/wishList.route');
const packagesRoute = require('./routes/client_routes/packages.route');
const homeRouter = require('./routes/home.route');
const notFound = require('./error/404');
const errorHandler = require('./error/500');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http')

const app = express();

app.use(express.json());
const server = http.createServer(app);

app.use(cors());


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});



app.use('/auth', signupRoutes);
app.use('/auth', verifyRoute);
app.use('/auth', signinRoute);
app.use('/admin',adminRoutes);
app.use(formRoute);
app.use(chartRoute);
app.use(wishListRoute);
app.use(packagesRoute);
app.use(homeRouter);
app.use(formRoute);

app.use('*', notFound);
app.use(errorHandler);



io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log('====================================');
    console.log(`User with ID: ${socket.id} sent message: ${data.message}`);
    console.log('====================================');
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
})


module.exports = {
  server: app,
  start: (port) => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}