const express = require('express');
const { authentication, restrictTo } = require('../controller/authController');
const { getAllUser } = require('../controller/userController');
 
const router = express.Router();


router.route('/').get(authentication,restrictTo('0'),getAllUser);

module.exports = router;