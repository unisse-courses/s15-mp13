const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    taskID: String,
    username: String,
    title: String,
    description: String,
    dateAdded: Date,
    isRequested: Boolean,
    isComplete: Boolean,
    isPublic: Boolean,
    tag1: String,
    tag2: String,
    tag3: String,
    numAdded: Number,
}, {collection: "tasks"});

module.exports = mongoose.model("tasks", taskSchema);
