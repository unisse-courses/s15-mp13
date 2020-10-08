const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  bio: String,
  displayPic: String,
  list: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'items',  
  }],
  // completed_req: Number,
})

module.exports = mongoose.model("users", userSchema);