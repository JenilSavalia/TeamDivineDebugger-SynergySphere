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

// 
export const addMembersToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, memberIds } = req.body; // userId = the one trying to add members

    // 1️⃣ Get the user who is trying to add members
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2️⃣ Check if user is a manager
    if (user.role !== 'PROJECT_MANAGER') {
      return res.status(403).json({ success: false, message: 'Only managers can add members' });
    }

    // 3️⃣ Verify the project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // 4️⃣ Add members to the project (many-to-many via ProjectMember)
    const addedMembers = [];
    for (const memberId of memberIds) {
      // Check if member exists
      const member = await prisma.user.findUnique({ where: { id: memberId } });
      if (member) {
        const alreadyMember = await prisma.projectMember.findFirst({
          where: { projectId, userId: memberId }
        });
        if (!alreadyMember) {
          const newMember = await prisma.projectMember.create({
            data: {
              projectId,
              userId: memberId
            }
          });
          addedMembers.push(newMember);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: 'Members added successfully',
      data: addedMembers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
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
            username: true,
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
