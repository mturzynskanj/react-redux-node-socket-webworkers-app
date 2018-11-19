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
        console.log('socket on chat ', data);
        let messageObj = {
            type:'chat',
            body: {
                handle: data.handle,
                message: data.message
            }
        }
        io.sockets.emit('chat', messageObj)
    });

    socket.on('typing',function(data){
        let messageObj={
            type:'typing',
            body:{
                handle: data.handle
            }
        }
        socket.broadcast.emit('typing', messageObj);
    })
});