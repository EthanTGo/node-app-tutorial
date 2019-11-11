

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(totalMemory);
console.log(freeMemory); 

//Template String usage
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);


const fs = require('fs');
const files = fs.readdirSync('./')
// files contains all the files in the current folder, defined by path
console.log(files)

//Asynchronous version always better but more complex
fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files)
})


// An event is a signal that something has happened in our application
// EventEmitter is a core module in Node

// EventEmitter is a class because we define the variable with upper case
const EventEmitter = require('events');
//emitter is the object created from the class
const emitter = new EventEmitter();

//Register a listener. Do this first before raising an event
//Here we pass on data
emitter.on('messageLogged',  (arg) => {
    console.log('listener called', arg)
})

//emmiter.emit('name of event') raises an event
//Raised an event
emitter.emit('messageLogged', {id: 1, url: 'http://'});
//Making a noise, produce - signalling that an event has happened

//Raise: logging (data:message)
emitter.on('logging', (arg) => {
    console.log('listener called', arg)
})

emitter.emit('logging', {data:'message'})
