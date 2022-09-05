const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/post');
const methodOverride = require('method-override');

const ejs = require('ejs');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/add_post', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);

//404
app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DBCONN!');
    app.listen(process.env.PORT, () => {
        console.log(`Server is live on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});
