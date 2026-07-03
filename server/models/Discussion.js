const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userPhoto: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Interview Experience', 'Doubts', 'Notes', 'General'], default: 'General' },
  companyTags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      userName: { type: String },
      userPhoto: { type: String },
      content: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', discussionSchema);
