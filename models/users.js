const User = mongoose.model('user', userSchema);
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  displayName: String,
  email: String,
  profilePic: String,
  bio: String,
  items: [Items],
})