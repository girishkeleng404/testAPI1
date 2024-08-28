const express = require('express');
const createProject = require('../controller/projectController');
const router = express.Router();
 


router.route('/').post(createProject)
 

module.exports= router;