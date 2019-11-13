const EventEmitter = require('events');
const url = 'http://mylogger.io/log';


class Logger extends EventEmitter {
 log(message) {
    //Send an HTTP request
    console.log(message)

    //emmiter.emit('name of event') raises an event
    //Raise an event
    this.emit('messageLogged', { id: 1, url: 'http://' });
    //Making a noise, produce - signalling that an event has happened

}
}


module.exports = Logger;
