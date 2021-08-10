
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);

module.exports = router;