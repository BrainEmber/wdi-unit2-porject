const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const User = require('../models/users.js');

router.get('/', (req, res)=>{
  Post.find({}, (err, foundPosts)=>{
    res.render('posts/index.ejs', {
      posts: foundPosts
    });
  });
});

router.get('/new', (req, res)=>{
  User.find({}, (err, allUsers)=>{
    res.render('posts/new.ejs', {
      users: allUsers
    });
  });
});

router.post('/', (req, res)=>{
  Post.create(req.body, (err, createdPost)=>{
    User.findById(req.body.userId, (err, foundUser)=>{
      foundUser.posts.push(createdPost);
      foundUser.save((err, data)=>{
        res.redirect('/posts');
      });
    });
  });
});

router.get('/:id', (req, res)=>{
  Post.findById(req.params.id, (err, foundPost)=>{
    User.findOne({ 'posts._id':req.params.id}, (err, foundUser)=>{
      res.render('posts/show.ejs', {
        post: foundPost,
        user: foundUser
      });
    });
  });
});

router.delete('/:id', (req, res)=>{
  Post.findByIdAndRemove(req.params.id, ()=>{
    User.findOne({'posts._id': req.params.id}, (err, foundUser)=>{
      foundUser.posts.id(req.params.id).remove();
      foundUser.save((err, savedUser)=>{
        res.redirect('/posts');
      });
    });
  });
});












module.exports = router;
