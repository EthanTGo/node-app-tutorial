const express = require('express');
const app = express();
const Joi = require('joi');
 

app.use(express.json());
app.use(express.urlencoded({ extended:true })); // key=value&key=value and put it into body
app.use(express.static('public')); //putting static assests like.css in a folder called public


const genres = [{id: 0, name:'horror'},{id: 1, name:'comedy'}]


app.get('/', (req,res) =>{
    res.send('home')
})


//Get all the genre
app.get('/api/', (req,res) =>{
    res.send(genres);
})
//Get a specific genre
app.get('/api/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given name was not found')
    res.send(genre);
})
//Create a new genre
app.post('/api/', (req,res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})
//Delete a genre
app.delete('/api/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given name was not found')
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})
//Update a genre
app.put('/api/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given name was not found')
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
})

function validateGenre(genre){
    const schema = {name: Joi.string().min(3).required()};
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));