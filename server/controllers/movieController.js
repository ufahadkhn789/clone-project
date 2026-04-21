const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search movies
// @route   GET /api/movies/search?q=
const searchMovies = async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          title: {
            $regex: req.query.q,
            $options: 'i',
          },
        }
      : {};

    const movies = await Movie.find({ ...keyword });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get movies by genre
// @route   GET /api/movies/genre/:genre
const getMoviesByGenre = async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovieById, searchMovies, getMoviesByGenre };
