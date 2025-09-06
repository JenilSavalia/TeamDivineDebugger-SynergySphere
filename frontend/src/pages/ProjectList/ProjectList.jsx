// frontend/src/pages/ProjectList/ProjectList.jsx
import React, { useState } from 'react';
import {
  Menu,
  Grid3X3,
  Search,
  Plus,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  ChevronDown,
  Star,
  BarChart3,
  Users,
  Filter,
  User,
  LogOut,
  Palette,
  ChevronLeft,
  X,
  Maximize2,
  Minimize2,
  Sun, Moon,
  Upload
} from 'lucide-react';

const ProjectList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    recent: true,
    starred: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const projects = [
    {
      id: 1,
      title: '2025 TermScout Development',
      type: 'Team-managed business',
      openItems: 0,
      doneItems: 5,
    },
    {
      id: 2,
      title: 'UI Revamp Q2',
      type: 'Design initiative',
      openItems: 3,
      doneItems: 10,
    },
    {
      id: 3,
      title: 'API Integration Phase 1',
      type: 'Development sprint',
      openItems: 1,
      doneItems: 7,
    },
    {
      id: 4,
      title: 'Customer Feedback Portal',
      type: 'Product feature',
      openItems: 2,
      doneItems: 4,
    },
  ];

  const CreateProjectModal = () => {
    const [modalMaximized, setModalMaximized] = useState(false);

    // form states
    const [projectName, setProjectName] = useState('');
    const [projectTags, setProjectTags] = useState([]);
    const [projectManager, setProjectManager] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [description, setDescription] = useState('');
    const [projectImage, setProjectImage] = useState(null);
    const [projectImagePreview, setProjectImagePreview] = useState(null);
    const [createAnother, setCreateAnother] = useState(false);


    // limits and options
    const nameCharLimit = 100;  // characters
    const descCharLimit = 500;  // characters

    const availableTags = ['Design', 'Development', 'Marketing', 'Research', 'Testing'];


    // helpers
    const countChars = (text) => (text ? text.length : 0);

    const handleNameChange = (e) => {
      const raw = e.target.value;
      if (raw.length <= nameCharLimit) {
        setProjectName(raw);
      } else {
        setProjectName(raw.slice(0, nameCharLimit));
      }
    };

    const handleDescriptionChange = (e) => {
      const raw = e.target.value;
      if (raw.length <= descCharLimit) {
        setDescription(raw);
      } else {
        setDescription(raw.slice(0, descCharLimit));
      }
    };

    const handleTagToggle = (tag) => {
      setProjectTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };



    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
      setProjectImage(file);
      // revoke old preview url if any
      if (projectImagePreview) {
        try { URL.revokeObjectURL(projectImagePreview); } catch (err) { }
      }
      if (file) {
        const url = URL.createObjectURL(file);
        setProjectImagePreview(url);
      } else {
        setProjectImagePreview(null);
      }
    };

    if (!createProjectModalOpen) return null;

    const nameCount = countChars(projectName);
    const descCount = countChars(description);


    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className={`bg-white rounded-lg shadow-xl ${modalMaximized ? 'w-full h-full m-4' : 'w-full max-w-4xl mx-4 max-h-[90vh]'
            } overflow-hidden`}
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-medium text-gray-900">New Project</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setModalMaximized(!modalMaximized)}
              >
                {modalMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setCreateProjectModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: modalMaximized ? 'calc(100vh - 200px)' : '70vh' }}>
            <p className="text-sm text-gray-600 mb-4">
              Required fields are marked with an asterisk <span className="text-red-500">*</span>
            </p>

            <div className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                  placeholder="Enter a compelling project name..."
                  value={projectName}
                  onChange={handleNameChange}
                />

                <div className="mt-1 text-xs">
                  <span className={nameCount > nameCharLimit ? 'text-red-500' : 'text-gray-500'}>
                    {nameCount}/{nameCharLimit} characters
                  </span>
                </div>

              </div>

              {/* Tags multi-select */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const active = projectTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full border text-sm ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'
                          }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manager + Deadline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Manager <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      className="w-full p-3 border rounded-md bg-white appearance-none pr-10 border-gray-200"
                      value={projectManager}
                      onChange={(e) => setProjectManager(e.target.value)}
                    >
                      <option value="">Assign project manager…</option>
                      <option>Jane Doe</option>
                      <option>John Smith</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Deadline</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-md border-gray-200"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium mb-2">Priority Level <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-6">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="priority"
                        value={lvl}
                        checked={priority === lvl}
                        onChange={() => setPriority(lvl)}
                        className="mt-1"
                      />
                      <span>{lvl} Priority</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Image upload with icon */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-500 mb-2" />
                  <span className="text-xs text-gray-500">Click to upload or drag & drop</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {projectImage && (
                  <div className="mt-2 text-xs text-gray-600">
                    Selected: {projectImage.name}
                  </div>
                )}
                {projectImagePreview && (
                  <img
                    src={projectImagePreview}
                    alt="preview"
                    className="mt-2 w-32 h-20 object-cover rounded-md"
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Description <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full p-3 min-h-[140px] resize-vertical border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your project goals, scope, requirements, and expected outcomes..."
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <div className="mt-1 text-xs">
<span className={descCount > descCharLimit ? 'text-red-500' : 'text-gray-500'}>
  {descCount}/{descCharLimit} characters
</span>

                </div>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={createAnother} onChange={(e) => setCreateAnother(e.target.checked)} />
              <span className="text-sm">Create another</span>
            </label>

            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-100"
                onClick={() => {
                  // Reset or discard
                  setProjectName('');
                  setProjectTags([]);
                  setProjectManager('');
                  setDeadline('');
                  setPriority('Medium');
                  setDescription('');
                  setProjectImage(null);
                  if (projectImagePreview) {
                    try { URL.revokeObjectURL(projectImagePreview); } catch (err) { }
                    setProjectImagePreview(null);
                  }
                  setCreateProjectModalOpen(false);
                }}
              >
                Discard
              </button>

              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                onClick={() => {
                  // send data to backend or handle creation
                  console.log({
                    projectName, projectTags, projectManager, deadline, priority, description, projectImage
                  });

                  if (!createAnother) {
                    setCreateProjectModalOpen(false);
                  } else {
                    // clear for another entry
                    setProjectName('');
                    setProjectTags([]);
                    setProjectManager('');
                    setDeadline('');
                    setPriority('Medium');
                    setDescription('');
                    setProjectImage(null);
                    if (projectImagePreview) {
                      try { URL.revokeObjectURL(projectImagePreview); } catch (err) { }
                      setProjectImagePreview(null);
                    }
                  }
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const CreateTaskModal = () => {
    const [workType, setWorkType] = useState('Task');
    const [status, setStatus] = useState('TO DO');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [createAnother, setCreateAnother] = useState(false);
    const [modalMaximized, setModalMaximized] = useState(false);

    if (!createTaskModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className={`bg-white rounded-lg shadow-xl ${modalMaximized ? 'w-full h-full m-4' : 'w-full max-w-2xl mx-4 max-h-[90vh]'} overflow-hidden`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-medium">New task</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setModalMaximized(!modalMaximized)}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setModalMaximized(!modalMaximized)}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setCreateTaskModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto" style={{ maxHeight: modalMaximized ? 'calc(100vh - 200px)' : '70vh' }}>
            <p className="text-sm text-gray-600 mb-4">
              Required fields are marked with an asterisk <span className="text-red-500">*</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full p-3 border rounded-md bg-white appearance-none pr-10 border-gray-200">
                    <option>2025 TermScout Development (BB2025)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Work type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 border rounded-md bg-white appearance-none pr-10 border-gray-200"
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                    >
                      <option>Task</option>
                      <option>Bug</option>
                      <option>Story</option>
                      <option>Epic</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <div className="relative">
                    <select
                      className="w-full p-3 border rounded-md bg-white appearance-none pr-10 border-gray-200"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>TO DO</option>
                      <option>IN PROGRESS</option>
                      <option>DONE</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Summary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <div className="border rounded-md border-gray-200">
                  <div className="border-b p-2 bg-gray-50 flex items-center gap-2 border-gray-200">
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">Tt</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">•••</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">A</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">≡</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">+</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded">※</button>
                  </div>
                  <textarea
                    className="w-full p-3 min-h-[120px] resize-none focus:outline-none"
                    placeholder="Paste a Confluence or Loom link here, and we'll generate a description automatically from the..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={createAnother}
                onChange={(e) => setCreateAnother(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Create another</span>
            </label>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              onClick={() => {
                // Handle task creation
                console.log({ workType, status, summary, description, createAnother });
                if (!createAnother) {
                  setCreateTaskModalOpen(false);
                }
                // Reset form if creating another
                if (createAnother) {
                  setSummary('');
                  setDescription('');
                }
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r transition-all duration-300 flex flex-col border-gray-200`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              {/* <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Grid3X3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-blue-600">Jira</span> */}
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2 text-blue-600 bg-blue-50 rounded">
              <User className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">For you</span>}
            </div>

            {/* <button
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
              onClick={() => toggleSection('recent')}
            >
              {expandedSections.recent ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {!sidebarCollapsed && <span className="text-sm">Recent</span>}
            </button> */}

              {/* <button
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
                onClick={() => toggleSection('starred')}
              >
                {expandedSections.starred ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <Star className="w-4 h-4" />
                {!sidebarCollapsed && <span className="text-sm">Starred</span>}
              </button> */}

            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Grid3X3 className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Apps</span>}
            </div>

            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              {!sidebarCollapsed && <span className="text-sm">Projects</span>}
            </div>
          </div>

          {/* Recent Projects */}
          {!sidebarCollapsed && (
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2 px-2">Recent</div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded"></div>
                </div>
                <span className="text-sm truncate">2025 TermScout Develo...</span>
              </div>
            </div>
          )}

          {/* Sidebar Footer */}
          <div className="mt-auto space-y-1">
            {/* <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Filters</span>}
            </div> */}
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <BarChart3 className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Dashboards</span>}
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Users className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Teams</span>}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-blue-600">Jira</span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setCreateProjectModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Project
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setCreateTaskModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Task
              </button>

              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                </button>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded">
                <HelpCircle className="w-5 h-5" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded">
                <Settings className="w-5 h-5" />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium"
                >
                  J
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-50 border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                          J
                        </div>
                        <div>
                          <h3 className="font-medium">Jenil Savalia</h3>
                          <p className="text-sm text-gray-600">jenil.savalia.cd@gmail.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <Settings className="w-4 h-4" />
                        Account settings
                      </button>
                      <button className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <div className="flex items-center gap-3">
                          <Palette className="w-4 h-4" />
                          Theme
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="border-t py-2 border-gray-200">
                      <div className="px-4 py-2 text-sm font-medium text-gray-700">Slack</div>
                      <div className="px-4 py-2 text-sm font-medium text-gray-700">Assigned items</div>
                    </div>

                    <div className="border-t py-2 border-gray-200">
                      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <User className="w-4 h-4" />
                        Switch account
                      </button>
                      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left text-red-600">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">For you</h1>

            {/* Recent Projects */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Recent projects</h2>
                <button className="text-blue-600 hover:underline text-sm">
                  View all projects
                </button>
              </div>

              {/* Grid for projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg border p-6 border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{project.type}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Quick links
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>My open work items</span>
                              <span className="text-gray-500">{project.openItems}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Done work items: {project.doneItems}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm">1 board</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Tabs */}
            {/* <div className="border-b mb-6">
              <div className="flex gap-6">
                <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">Worked on</button>
                <button className="pb-3 text-gray-600 hover:text-gray-900">Viewed</button>
                <div className="flex items-center gap-2">
                  <button className="pb-3 text-gray-600 hover:text-gray-900">Assigned to me</button>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">0</span>
                </div>
                <button className="pb-3 text-gray-600 hover:text-gray-900">Starred</button>
                <button className="pb-3 text-gray-600 hover:text-gray-900">Boards</button>
              </div>
            </div> */}

            {/* Illustration */}
            {/* <div className="flex justify-center">
              <div className="text-center">
                <div className="w-64 h-48 mx-auto mb-4 bg-gradient-to-br from-orange-400 via-yellow-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">📊</div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div>

      {/* Create Task Modal */}
      <CreateProjectModal />
      <CreateTaskModal />

      {/* Click outside to close profile menu */}
      {profileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectList;