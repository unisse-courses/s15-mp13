const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commID: String,
    taskID: String,
    username: String,
    comment: String,
    numLikes: Number,
    numDislikes: Number,
}, {collection: "comments"});

module.exports = mongoose.model("comments", commentSchema);
