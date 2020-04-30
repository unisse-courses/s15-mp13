const User = mongoose.model('user', userSchema);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePic: {
    type: String,
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