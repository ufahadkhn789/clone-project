const User = require('../models/User');

const getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('myList');
    if (user) {
      res.json(user.myList);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToMyList = async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      if (!user.myList.includes(movieId)) {
        user.myList.push(movieId);
        await user.save();
      }
      res.json({ message: 'Added to My List', myList: user.myList });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromMyList = async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      user.myList = user.myList.filter(id => id.toString() !== movieId);
      await user.save();
      res.json({ message: 'Removed from My List', myList: user.myList });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { movieId, progress } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      const historyIndex = user.watchHistory.findIndex(h => h.movieId.toString() === movieId);
      
      if (historyIndex > -1) {
        user.watchHistory[historyIndex].progress = progress;
        user.watchHistory[historyIndex].lastWatched = Date.now();
      } else {
        user.watchHistory.push({ movieId, progress });
      }

      await user.save();
      res.json({ message: 'Progress updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchHistory.movieId');
    if (user) {
      res.json(user.watchHistory);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyList, addToMyList, removeFromMyList, updateProgress, getWatchHistory };
