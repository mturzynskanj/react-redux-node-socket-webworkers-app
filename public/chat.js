//make connection

//var socket = io.connect('http://localhost:4000');
let $handle = document.getElementById('handle');
let $message = document.getElementById('message');
let $send = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


//webworker 

const worker = new Worker('webworker.js');

worker.addEventListener('message', function(msgObj){
    console.log('getting message ', msgObj);
    const msgData = msgObj.data;
    const msgType = msgData.type;
    
    switch (msgType){
        case 'chat':
          output.innerHTML += '<p><em>'+ msgData.body.handle +'</em> ---'+ msgData.body.message+'</p>'
          feedback.innerHTML="";
        break; 
        case 'typing':
          feedback.innerHTML = '<p><em>'+msgData.body.handle +',  is typing message</em></p>'
        break;
    }
});

$send.addEventListener('click', function(){
    worker.postMessage({
        type: 'chat',
        body: {
            message: $message.value,
            handle: $handle.value
        }
    })
});

$message.addEventListener('keypress', function(){
    worker.postMessage({
        type:'typing',
        body: {
            handle: $handle.value
        }
    })
})


