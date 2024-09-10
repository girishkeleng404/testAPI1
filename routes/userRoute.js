const express = require('express');
const { authentication, restrictTo } = require('../controller/authController');
const { getAllUser, getUserById } = require('../controller/userController');
 
const router = express.Router();


router.route('/')
.get(authentication,restrictTo('0'),getAllUser);

router.route('/:id')
.get(authentication,restrictTo('0'),getUserById);

module.exports = router;