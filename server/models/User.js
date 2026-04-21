const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  myList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
