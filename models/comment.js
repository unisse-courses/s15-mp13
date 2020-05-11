const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    commenter: { type: Schema.Types.ObjectId, ref: 'users', required: [true, "no commenter id provided"] },
    comment: { type: String, required: [true, "No comment provided"] }
  }
);

const commentModel = mongoose.model('comment', PostSchema);