const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dateAdded: Date,
    isRequested: Boolean,
    isComplete: Boolean,
    isPrivate: Boolean,
    tags:[{
      tag1: String,
      tag2: String,
      tag3: String,
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'comments',   
    }],
  }
);

module.exports = mongoose.model("items", itemSchema);
