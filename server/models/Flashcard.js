const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    index: true
  },
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
