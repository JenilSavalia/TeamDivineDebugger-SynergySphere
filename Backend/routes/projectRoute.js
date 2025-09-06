const express = require('express');
const { createProject, getAllProjects, getProjectById } = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');
const upload = require('../middleware/upload');

const router = express.Router();

// @route   POST /api/projects
// @desc    Create a new project
// @access  Public (add authentication middleware later)
router.post('/', upload.single('image'), validateProject, createProject);

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', getProjectById);

module.exports = router;
