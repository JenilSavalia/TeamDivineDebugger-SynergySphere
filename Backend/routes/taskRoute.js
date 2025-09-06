// backend/routes/taskRoute.js
import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByProject,
  getTasksByAssignee,
  updateTaskStatus
} from '../controllers/taskController.js';
// import { validateTask } from '../middleware/validation.js';
// import upload from '../middleware/upload.js';

const router = express.Router();

// Create task (with optional image upload)
router.post('/', createTask);

// Get all tasks
router.get('/', getAllTasks);

// Get task by ID
router.get('/:id', getTaskById);

// Get tasks by project
router.get('/project/:projectId', getTasksByProject);

// Get tasks by assignee
router.get('/assignee/:assigneeId', getTasksByAssignee);

// Update task status
router.put('/:id/status', updateTaskStatus);

export default router;
