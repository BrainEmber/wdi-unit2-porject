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
})

















module.exports = router;
