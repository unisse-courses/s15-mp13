const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    taskID: String,
    username: String,
    comment: String,
}, {collection: "comments"});

module.exports = mongoose.model("comments", commentSchema);
