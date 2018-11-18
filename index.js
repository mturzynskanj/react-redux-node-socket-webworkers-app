let express = require('express');
let socket = require('socket.io');


//app setup
let app = express();
var server = app.listen(4000, function () {
    console.log('listening for request port 4000')
});


//static fiels

app.use(express.static('public'));

//socket setup 

var io = socket(server);

io.on('connection', function (socket) {
    console.log('made connection ', socket.id);
    socket.on('chat', function (data) {
        console.log('data ', data);
        io.sockets.emit('chat', data)
    });

    socket.on('typing',function(data){
        console.log('on server typing ')
        socket.broadcast.emit('typing', data);
    })
});