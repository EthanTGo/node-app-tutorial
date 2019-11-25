const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses')
const home_page = require('./routes/home')
const express = require('express');
const app = express();


//using pug as a template engine
//express loads to module
app.set('view engine', 'pug')
//optional, by default it's already set up
app.set('views','./views'); //put all template into a folder called views

console.log(`The environment variable is ${process.env.NODE_ENV}`) //undefined
console.log(app.get('env'))


app.use(express.json());
app.use(express.urlencoded({ extended:true })); // key=value&key=value and put it into body
app.use(express.static('public')); //putting static assests like.css in a folder called public
app.use(helmet());
app.use('/api/courses', courses)
app.use('/', home_page)

//Configuration Settings for your applications
console.log('Application name ' + config.get('name'));
console.log('Mail Server is ' + config.get('mail.host'));
//The password is stored in an ENV variable to keep it hidden

console.log('Mail Password is ' + config.get('mail.password')); 

//Same as checking process.env.NODE_ENV
//set DEBUG=app:startup -> to see startupDebugger
//set DEBUG=* -> wildcard
if(app.get('env') === 'development')
{
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled')
}

//Db work
dbDebugger('Connected to the database...')

//First logging is called
app.use(logger)

app.use(function(req, res, next) {
    console.log('Authenthicating...')
    next();
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
