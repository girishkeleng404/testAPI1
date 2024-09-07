const express = require('express');
const {createProject,getAllProject, getProjectById, upDateProject, deleteProject} = require('../controller/projectController');
const { authentication, restrictTo } = require('../controller/authController');
const router = express.Router();
 


router.route('/')
.post(authentication,restrictTo('1'), createProject)
.get(authentication,getAllProject)
 
router.route('/:id')
.get(authentication,getProjectById)
.patch(authentication, upDateProject)
.delete(authentication, deleteProject);

module.exports= router;