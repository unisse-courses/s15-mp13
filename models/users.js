const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  bio: String,
  displayPic: String,
}, {collection: "users"})

module.exports = mongoose.model("users", userSchema);