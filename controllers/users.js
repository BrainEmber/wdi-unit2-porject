const express = require('express');
const User = require('../models/users.js');
const Post = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    res.render('users/index.ejs', {
      users: foundUsers
    });
  });
});

router.post('/', (req, res)=>{
  User.create(req.body, (err, createdUser)=>{
    res.redirect('/users')
  });
});

router.get('/new', (req, res)=>{
  res.render('users/new.ejs')
});

router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
    const postIds = [];
    for(let i=0; i < foundUser.posts.length; i++){
      postIds.push(foundUser.posts[i]._id);
    }
    Post.remove(
      {
        _id: {
          $in: postIds
        }
      },
        (err, data)=>{
          res.redirect('/users');
        }
    );
  });
});

router.get('/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

router.put('/:id', (req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/users');
  });
});
















module.exports = router;
