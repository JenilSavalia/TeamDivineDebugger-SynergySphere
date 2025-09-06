import pkg from '@prisma/client';
const { PrismaClient, TaskStatus } = pkg;

const prisma = new PrismaClient();
// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
  try {
    const { name, assigneeId, projectId, tags, deadline, description, status } = req.body;

    // Validate required fields
    if (!name || !projectId || !deadline) {
      return res.status(400).json({ success: false, message: "Name, projectId and deadline are required" });
    }

    // Validate deadline
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid deadline date" });
    }

    // Handle image upload
    // let imageUrl = req.body.image || null;
    // if (req.file) {
    //   imageUrl = `/uploads/tasks/${req.file.filename}`;
    // }

    // Check project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // If assignee is provided, check if user exists
    if (assigneeId) {
      const assignee = await prisma.user.findUnique({ where: { id: assigneeId } });
      if (!assignee) {
        return res.status(404).json({ success: false, message: "Assignee not found" });
      }
    }

    // Validate status (fallback = TODO)
    const validStatus = status && Object.values(TaskStatus).includes(status) ? status : TaskStatus.TODO;

    // Create task
    const task = await prisma.task.create({
      data: {
        name,
        assignee: { connect: { id: assigneeId } },  // ✅ connect to user
        project: { connect: { id: projectId } },
        tags,
        deadline: deadlineDate,
        // image: imageUrl,
        description,
        status: validStatus
      },
      include: {
        assignee: { select: { id: true, username: true, email: true } },
        project: {
          select: {
            id: true,
            name: true,
            projectManager: { select: { id: true, username: true, email: true } }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

// @desc    Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const { status, projectId, assigneeId, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;
    if (assigneeId) where.assigneeId = assigneeId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true, projectManager: { select: { id: true, name: true, email: true } } } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });

    const totalTasks = await prisma.task.count({ where });

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTasks / parseInt(limit)),
        totalTasks,
        hasNextPage: skip + tasks.length < totalTasks,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve tasks' });
  }
};

// @desc    Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true, projectManager: { select: { id: true, name: true, email: true } } } }
      }
    });

    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    res.json({ success: true, message: 'Task retrieved successfully', data: task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve task' });
  }
};

// @desc    Get tasks by project
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query;

    const where = { projectId };
    if (status) where.status = status;

    const tasks = await prisma.task.findMany({
      where,
      include: { assignee: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, message: 'Project tasks retrieved successfully', data: tasks, count: tasks.length });
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve project tasks' });
  }
};

// @desc    Get tasks by assignee
export const getTasksByAssignee = async (req, res) => {
  try {
    const { assigneeId } = req.params;
    const { status } = req.query;

    const where = { assigneeId };
    if (status) where.status = status;

    const tasks = await prisma.task.findMany({
      where,
      include: { project: { select: { id: true, name: true, projectManager: { select: { id: true, name: true, email: true } } } } },
      orderBy: { deadline: 'asc' }
    });

    res.json({ success: true, message: 'Assignee tasks retrieved successfully', data: tasks, count: tasks.length });
  } catch (error) {
    console.error('Get assignee tasks error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve assignee tasks' });
  }
};

// @desc    Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Must be TODO, IN_PROGRESS, or DONE' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { status },
      include: { assignee: { select: { id: true, name: true, email: true } }, project: { select: { id: true, name: true } } }
    });

    res.json({ success: true, message: 'Task status updated successfully', data: task });
  } catch (error) {
    console.error('Update task status error:', error);
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(500).json({ success: false, message: 'Failed to update task status' });
  }
};
