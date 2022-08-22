const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.render('index', {
        posts,
    });
};

exports.getPost = async (req, res) => {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.render('post', {
        post,
    });
};

exports.createPost = async (req, res) => {
    console.log(req.body);
    await Post.create(req.body);
    res.redirect('/');
};

exports.updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;
    await post.save();

    res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    await post.delete();
    res.redirect(`/`);
};
