import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
export const createProject = async (req, res) => {
  try {
    const { name, tags, projectManagerId, deadline, priority, description } = req.validatedData;

    // Handle image upload
    let imageUrl = req.validatedData.image || null; // If image URL is provided
    if (req.file) {
      imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    // Check if project manager exists (optional)
    if (projectManagerId) {
      const manager = await prisma.user.findUnique({
        where: { id: projectManagerId }
      });

      if (!manager) {
        return res.status(404).json({
          success: false,
          message: "Project manager not found"
        });
      }
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        tags,
        projectManagerId: projectManagerId || null,
        deadline: new Date(deadline),
        priority,
        image: imageUrl,
        description
      },
      include: {
        projectManager: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });

  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};



// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        projectManager: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
      count: projects.length
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects'
    });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        projectManager: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project'
    });
  }
};
