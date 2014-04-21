var app = require('./app');
var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(app).listen(3000);
var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

server;

console.log('Magic happens on port 3000');