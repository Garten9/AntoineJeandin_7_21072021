const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
// router.get('/:id', auth, postCtrl.getOneSauce );
router.post('/', auth, postCtrl.createPost);
// router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);


module.exports = router;