const express = require('express');
const router = express.Router();
const { getMyList, addToMyList, removeFromMyList } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/mylist', protect, getMyList);
router.post('/mylist/add', protect, addToMyList);
router.post('/mylist/remove', protect, removeFromMyList);

module.exports = router;
