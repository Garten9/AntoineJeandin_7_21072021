const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);


module.exports = router;