const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
