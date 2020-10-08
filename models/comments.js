const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema(
  {
    commenter: String,
    comment: String,
  }
);

module.exports = mongoose.model("comments", commentSchema);
