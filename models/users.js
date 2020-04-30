const User = mongoose.model('user', userSchema);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },
  bio: {
    type: String,
  },
  items: [Items],
})

const docs = [
  {username: 'kimi',
  password: 'sample123',
  displayName: 'Kimi Catahan',
  email: 'kimicatahan@gmail.com',
  profilePic: 'assets\img\1.png',
  bio: 'I love my country and Aaron Tveit.',
  },
  {username: 'rainBowie',
  password: '_ulan_',
  displayName: 'Rainbow Dasher',
  email: 'roygbiv@gmail.com',
  profilePic: 'https://i.pinimg.com/originals/54/cd/5c/54cd5c476305fb4b50df719a8a2000a0.jpg',
  bio: 'Colored blue but feeling extremely yellow!',
  }
];

User.create(docs, function(err, users){
  if(err) throw err;
  console.log(users);
  console.log("- User accounts created")
})