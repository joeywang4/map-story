const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/user', (req, res) => {
    if(req.session.isLogin){
        User.findById(req.session.uid, '_id user icon', (err, _user) => {
            if(err) errHandler(err, res);
            else res.status(200).send(_user)
        })
    }
    else res.status(401).send("Please login first!");
});

router.post('/post', (req, res) => {
    if(req.session.isLogin) {
        const _latlng = req.body.latlng.split(",").map(num => parseFloat(num));
        const _story  = req.body.story;
        if(!_latlng || !_story) res.status(400).send("Missing value!");
        let data = {author: req.session.uid, content: _story, latlng: _latlng, time: Math.round(Date.now()/1000)};
        const newPost = Post(data);        
        newPost.save(err => {            
            if(err) errHandler(err, res);
            else{
                console.log("Post created:", _story, "; By:", req.session.uid);
                res.redirect("/");
                User.findById(data.author, (err, _user) => {
                    if(err) console.error(err);
                    data.author = _user;
                    req.app.io.emit('update', data);
                })
            }
        })
    }
    else res.status(401).send("Please login first!")
})

router.get('/post', (req, res) => {
    Post.find().limit(100).sort({time: -1}).populate('author', 'user icon').exec((err, found) => {
        if(err) errHandler(err, res);
        else {
            res.status(200).send(found);
        }
    })
})

router.get('/post/self', (req, res) => {
    if(req.session.isLogin) {
        Post.find({author: req.session.uid}).populate('author', 'user icon').exec((err, found) => {
            if(err) errHandler(err, res);
            res.status(200).send(found);
        })
    }
    else res.status(401).send("Please login first!");
})

const errHandler = (err, res) => {
    console.error(err);
    res.status(500).send("Server error");
}
module.exports = router;