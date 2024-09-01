const express = require('express');
const createProject = require('../controller/projectController');
const { authentication, restrictTo } = require('../controller/authController');
const router = express.Router();
 


router.route('/').post(authentication,restrictTo('1'), createProject)
 

module.exports= router;