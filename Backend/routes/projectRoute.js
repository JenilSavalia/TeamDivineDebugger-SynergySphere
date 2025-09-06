import express from 'express';
import { createProject, getAllProjects, getProjectById } from '../controllers/projectController.js';
import { validateProject } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';
import { addMembersToProject } from '../controllers/projectController.js';
// import { authenticateJWT } from '../middleware/authMiddleware.js';
// import { authorize } from '../middleware/authorize.js';

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

// @route   POST /api/projects/:projectId/add-members
// @desc    Add members to a project
// @access  Private (PROJECT_MANAGER only)

router.post('/:projectId/add-members',
    addMembersToProject
);
export default router;
