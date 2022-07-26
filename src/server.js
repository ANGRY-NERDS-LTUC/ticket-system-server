'use strict';

const express = require('express');
const cors = require('cors');
const signupRoutes = require('./routes/auth_routes/signup.route');
const verifyRoute = require('./routes/auth_routes/verify.route');
const signinRoute = require('./routes/auth_routes/signin.route');
const notFound = require('./error/404');
const errorHandler = require('./error/500');
const { Server } = require('socket.io');

const app = express();
const http = require('http')
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.use('/auth', signupRoutes);
app.use('/auth', verifyRoute);
app.use('/auth', signinRoute)

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