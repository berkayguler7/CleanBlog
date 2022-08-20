const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');
const ejs = require('ejs');
const path = require('path');
const { PhoneNumberContext } = require('twilio/lib/rest/lookups/v1/phoneNumber');
const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', {
        posts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/add_post', (req, res) => {
    res.render('add_post');
})

app.get('/posts', (req, res) => {
    res.render('post');
})

app.get('/posts/:id', async (req, res) => {
    console.log(req.params.id)
    const post = await Post.findById(req.params.id)
    console.log(post);
    res.render('post', {
        post
    });
})

app.post('/add_post', async (req, res) => {
    console.log(req.body);
    await Post.create(req.body);
    res.redirect('/');
})

//404
app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
})
