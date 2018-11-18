//make connection

var socket = io.connect('http://localhost:4000');
let $handle = document.getElementById('handle');
let $message = document.getElementById('message');
let $send = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


//webworker 
/*
const worker = new Worker('webworker.js');

console.log('what is worker ', worker);

worker.addEventListener('message', function(e){
  console.log('message from worker ', e.data);
})
*/

//worker.postMessage({type: 'solaceInstance', message: socket.id
//});

//emit event

$send.addEventListener('click', function(){
    socket.emit('chat', {
        message:$message.value,
        handle: $handle.value
    })
});


//listen for fron end events.

$message.addEventListener('keypress', function(){
    socket.emit('typing',handle.value)
})


socket.on('chat', function(data){
    output.innerHTML +='<p><em>'+ data.handle+'</em><span>'+ data.message+'</span></p>';
    feedback.innerHTML ="";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p>'+data +' is typing message</p>'
})
