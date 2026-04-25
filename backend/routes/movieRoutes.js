const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, searchMovies, getMoviesByGenre } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getMovies);
router.get('/search', protect, searchMovies); 
router.get('/genre/:genre', protect, getMoviesByGenre);
router.get('/:id', protect, getMovieById);

module.exports = router;
