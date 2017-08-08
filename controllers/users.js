const express = require('express');
const User = require('../models/users.js');
const Post = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('users/index.ejs');
})

















module.exports = router;
