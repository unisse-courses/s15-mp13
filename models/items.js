const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Fill up item title provided"],
    },
    description: {
      type: String,
      maxlength: 300,
    },
    date_added: { type: Date },
    is_requested: { type: Boolean },
    is_complete: { type: Boolean },
    is_private: { type: Boolean },
    tags:[{
      tag1:{ type: String, maxlength: 30 },
      tag2:{ type: String, maxlength: 30 },
      tag3:{ type: String, maxlength: 30 },
    }],
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'comments', 
      required: [true, 'No comments listed.'],      
    }],
  }
);

const itemModel = mongoose.model('item', PostSchema);