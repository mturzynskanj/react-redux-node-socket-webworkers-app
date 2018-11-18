importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js');



//create socket
var socket = io.connect('http://localhost:4000');
console.log('what is socket ', socket);

self.addEventListener('message', function(e){
    console.log('inside webworker.js', e.data);
    
})

self.postMessage('response from worker')