importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js');



//create socket
var socket = io.connect('http://localhost:4000');
console.log('what is socket ', socket);


socket.on('chat', function (msgObj) {
    console.log('here...', msgObj);
    postMessage(msgObj)
});


socket.on('typing', function(msgObj){
    console.log('typing ...', msgObj);
    postMessage(msgObj)
})








///webworker

self.addEventListener('message', function (e) { 
    console.log('inside webworker.js', e.data.type);
    const messageType = e.data.type;
    const messageBody = e.data.body;
    switch (messageType) {
        case 'chat':
            socket.emit('chat', {
                message: messageBody.message,
                handle: messageBody.handle
            });
            break;

        case 'typing': 
            this.console.log('inside typing...')
            socket.emit('typing',{
                handle: messageBody.handle
            })
        break;
    }

})

