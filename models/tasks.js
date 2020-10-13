const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    username: String,
    taskID: String,
    title: String,
    description: String,
    dateAdded: Date,
    isRequested: Boolean,
    isComplete: Boolean,
    isPrivate: Boolean,
    // tags:[{
    tag1: String,
    tag2: String,
    tag3: String,
    // }],
}, {collection: "tasks"});

module.exports = mongoose.model("tasks", taskSchema);
