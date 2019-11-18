const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();


console.log(`The environment variable is ${process.env.NODE_ENV}`) //undefined
console.log(app.get('env'))


app.use(express.json());
app.use(express.urlencoded({ extended:true })); // key-value&key=value and put it into body
app.use(express.static('public')); //putting static assests like.css in a folder called public
app.use(helmet());

//Configuration Settings for your applications
console.log('Application name ' + config.get('name'));
console.log('Mail Server is ' + config.get('mail.host'));
//The password is stored in an ENV variable to keep it hidden

console.log('Mail Password is ' + config.get('mail.password')); 

//Same as checking process.env.NODE_ENV
//set DEBUG=app:startup to see startupDebugger
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

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course)
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error. This is destructuring
    
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1, 
        name: req.body.name};
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req,res) => {
    // Look up the course
    //If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    // Validate
    //if invalid, return 400 -bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name;
    //Return updated course
    res.send(course);

});

app.delete('/api/courses/:id', (req,res) =>{
    //Look up the course
    //Not exist , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the same course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema)
};




// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
