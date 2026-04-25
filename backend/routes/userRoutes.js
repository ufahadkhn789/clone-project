const express = require('express');
const router = express.Router();
const { getMyList, addToMyList, removeFromMyList, updateProgress, getWatchHistory } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/mylist', protect, getMyList);
router.post('/mylist/add', protect, addToMyList);
router.post('/mylist/remove', protect, removeFromMyList);
router.post('/progress', protect, updateProgress);
router.get('/history', protect, getWatchHistory);

module.exports = router;
