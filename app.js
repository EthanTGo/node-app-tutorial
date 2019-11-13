const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(totalMemory);
console.log(freeMemory); 

//Template String usage
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//------------------------------------------
const fs = require('fs');
const files = fs.readdirSync('./')
// files contains all the files in the current folder, defined by path
console.log(files)

//Asynchronous version always better but more complex
fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files)
})
//-----------------------------------------------

// An event is a signal that something has happened in our application
// EventEmitter is a core module in Node

// EventEmitter is a class because we define the variable with upper case
//Here we pass on data
const EventEmitter = require('events');
//emitter is the object created from the class


const Logger = require('./logger')
const logger = new Logger();

//Register an event called message logged
logger.on('messageLogged', (arg) => {
    console.log('listener called', arg)
})

logger.log('message')

//************************************************************
//Note that we don't use this modle, but here we learn the idea behind the express backend framework

const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World')
        res.end()
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})
//server has all the capablty of an EventEmitter
server.listen(3000);
console.log('Listening on port 3000')