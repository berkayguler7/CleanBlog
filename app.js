const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const PORT = 3000;


//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/add_post', (req, res) => {
    res.render('add_post');
})

app.get('/post', (req, res) => {
    res.render('post');
})

//404
app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
})
