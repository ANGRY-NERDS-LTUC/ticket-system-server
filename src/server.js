'use strict';

const express = require('express');
const signupRoutes = require('./routes/auth_routes/signup.route');
const verifyRoute = require('./routes/auth_routes/verify.route');
const signinRoute = require('./routes/auth_routes/signin.route');
const adminRoutes = require('./routes/admin_routes/dashboard.route');
const companyRoute = require('./routes/company_routes/form.route');
const chartRoute = require('./routes/client_routes/chart.route');
const wishListRoute = require('./routes/client_routes/wishList.route');
const packagesRoute = require('./routes/client_routes/packages.route');
const { Purchase } = require('../src/models/models.connection');
const homeRouter = require('./routes/home.route');
const roomIdRoute = require('./routes/client_routes/roomId.route');
const notFound = require('./error/404');
const errorHandler = require('./error/500');
const {
  Server
} = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.json());
const server = http.createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, "notification")));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function handleCreate(data) {
  await Purchase.create(data);
}

const event = io.of('/purchase');

event.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`);

  socket.on('packages-purchased', (data) => {
    console.log("data: ", data);
    handleCreate(data);
    let adminMessage = `The user ${data.userName} with the id (${data.userId}) purchased the ${data.packageTitle} package with the id (${data.packageId}), created by ${data.createdBy}.`;
    let companyMessage = `The user ${data.userName} with the id (${data.userId}) purchased the ${data.packageTitle} package with the id (${data.packageId}).`;
    event.emit('send-notification-admin', adminMessage);
    event.emit('send-notification-company', companyMessage);
  })
});



app.use('/auth', signupRoutes);
app.use('/auth', verifyRoute);
app.use('/auth', signinRoute);
app.use('/admin', adminRoutes);
app.use('/company', companyRoute);
app.use('/client', chartRoute);
app.use('/client', wishListRoute);
app.use('/client', packagesRoute);
app.use('/client', roomIdRoute);
app.use('/home', homeRouter);

app.use('*', notFound);
app.use(errorHandler);


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
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