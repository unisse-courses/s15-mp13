const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "No username provided"], },
  password: { type: String, required: [true, "No password provided"], },
  displayName: { type: String, required: true, },
  email: { type: String, required: [true, "No email provided"], },
  displayPic: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',  },
  bio: { type: String, maxlength: 300, },
  list: [{
    type: Schema.Types.ObjectId, 
    ref: 'items', 
    required: [true, 'No items provided by the user.'],      
  }],
  completed_req: { type: Number }
})

const userModel = mongoose.model('user', userSchema);

module.exports = mongoose.model('users', userSchema);

module.exports.LoginValidate = function(email, password, next) {
  usersModel.findOne({email: email}, function(err, userResult){
    if(err) throw err;

    if(!userResult){
      next();
    } else {
      bcrypt.compare(password, userResult.password, (err, result) =>{
        if (userResult && result){
          next("valid");
        }
        else{
            next();
        }
      })
    }
  });
};

module.exports.getProfileByUsername = function(username, next){
  usersModel.findOne({ username: username }, function(err, profile) {
    if(err) throw err;
    if(profile){
      next(profile.toObject());
    } else {
      next();
    }
  });
};

module.exports.createUser = function(username, email, img, password, next){

  usersModel.findOne({$or:[{username: username}, {email: email}]}, function(err, userResults){
      if(err) throw err;

      if (userResults){
          next();
      }
      else{

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashed) =>{
          
          const newhashed = new usersModel({
            username: username,
            email: email,
            img: img,
            password: hashed
          });
          newhashed.save(function(err, newUser) {
            var result;
            if (err) {
            
                result = "";
                next();
            } else {

                result = "valid";
                next(result);
            }
        });
        });

          
      }
  });
}

// User.create(docs, function(err, users){
//   if(err) throw err;
//   console.log(users);
//   console.log("- User accounts created")
// })