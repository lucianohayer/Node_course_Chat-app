const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io =  socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Lautaro',
        text: 'Hey man, whats up?',
        createdAt: 123123121
    });

    socket.on('createMessage', (message) => {
        console.log('createMesasage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from client');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});



