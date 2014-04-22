var app = require('./app');
var http = require('http');
var socket = require('socket.io');

var server = http.createServer(app).listen(3000);
var io = socket.listen(server);

io.sockets.on('connection', function (client) {

   /* client.on('messages',function(message){
    	client.get('nickname',function(err, name){
    		client.emit('messages', name, message);
    	});
    });

    client.on('send', function (data) {
        io.sockets.emit('message', data);
    });*/

    client.on('join', function(name){
    	client.set('nickname',name);
    	client.broadcast.emit('sidebarchat', name, client.id);
    });

    client.on('privatechat', function(clientid, name, text){
    	io.sockets.socket(clientid).emit('privatechat', name, text, client.id);
    });

    client.on('getname', function(){
        client.get('nickname', function(err, name){
            client.emit('putname', name);
        });
    });
});

server;

console.log('Magic happens on port 3000');