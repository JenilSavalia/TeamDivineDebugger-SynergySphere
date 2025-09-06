import express from 'express';
import { createProject, getAllProjects, getProjectById } from '../controllers/projectController.js';
import { validateProject } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';

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

export default router;
