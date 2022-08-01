'use strict'; 

const socket = require('socket.io-client');
let event = socket.connect('http://localhost:5000/purchase');

event.on('send-notification-admin', (message) => {
    console.log(message);
})