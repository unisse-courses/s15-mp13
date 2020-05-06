const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "No username provided"],
  },
  password: {
    type: String,
    required: [true, "No password provided"],
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "No email provided"],
  },
  profilePic: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },
  bio: {
    type: String,
    maxlength: 300,
  },
  list: [{
    type: Schema.Types.ObjectId, 
    ref: 'items', 
    required: [true, 'No items provided by the user.'],      
  }],
  completed_req: {
    type: Number,
  }
})

const userModel = mongoose.model('user', userSchema);

// User.create(docs, function(err, users){
//   if(err) throw err;
//   console.log(users);
//   console.log("- User accounts created")
// })