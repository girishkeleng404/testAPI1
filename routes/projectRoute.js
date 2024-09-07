const express = require('express');
const {createProject,getAllProject, getProjectById, upDateProject, deleteProject} = require('../controller/projectController');
const { authentication, restrictTo } = require('../controller/authController');
const router = express.Router();
 


router.route('/')
.post(authentication,restrictTo('1'), createProject)
.get(authentication,restrictTo('1'),getAllProject)
 
router.route('/:id')
.get(authentication,restrictTo('1'),getProjectById)
.patch(authentication, restrictTo('1'),upDateProject)
.delete(authentication, restrictTo('1'),deleteProject);

module.exports= router;