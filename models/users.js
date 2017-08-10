const mongoose = require('mongoose');
const Post = require('./posts.js');


const userSchema = mongoose.Schema({
  name: String,
  posts: [Post.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
