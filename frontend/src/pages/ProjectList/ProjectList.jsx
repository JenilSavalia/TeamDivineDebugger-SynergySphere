import React, { useState, useEffect, useRef } from 'react';
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
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    recent: true,
    starred: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const searchRef = useRef(null);
  const [projects, setProjects] = useState([
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
  ]);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle clicks outside the search bar to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter projects for suggestions based on search query
  const filteredSuggestions = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter projects for display based on selected project
  const filteredProjects = selectedProject
    ? projects.filter(project => project.title === selectedProject)
    : projects;

  // Handle suggestion selection
  const handleSelectSuggestion = (title) => {
    setSearchQuery(title);
    setSelectedProject(title);
    setShowSuggestions(false);
  };

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    if (!value) {
      setSelectedProject(null);
    }
  };

  // ---------------- Notification Panel ----------------
  const NotificationPanel = () => {
    if (!notificationOpen) return null;

    const notifications = [
      {
        id: 1,
        user: "Alex Carter",
        avatar: "",
        date: "2 weeks ago",
        title: "Q3 Planning Agenda",
        project: "ACME-57 · In Progress",
        mention:
          "@Jamie Brooks @Taylor Morgan – I'll be creating agendas here for our weekly syncs.",
        unread: true,
      },
      {
        id: 2,
        user: "Jamie Brooks",
        avatar: "",
        date: "1 week ago",
        title: "Sprint Retrospective",
        project: "ACME-58 · To Do",
        mention:
          "@Alex Carter @Taylor Morgan please check the updated notes for this sprint's retrospective.",
        unread: false,
      },
    ];

    const filtered = onlyUnread
      ? notifications.filter((n) => n.unread)
      : notifications;

    const Avatar = ({ name, avatar }) => {
      if (avatar) {
        return (
          <img
            src={avatar}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
        );
      }
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm font-medium">
          {initials}
        </div>
      );
    };

    return (
      <div className={`absolute ${isMobile ? 'inset-0' : 'top-14 right-4 w-[420px] h-[80vh]'} bg-white shadow-xl border rounded-lg flex flex-col z-50 border-gray-200`}>
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-medium">Notifications</h2>
          <button
            onClick={() => setNotificationOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center justify-between border-b px-3 border-gray-200">
          <div className="flex">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Direct
            </button>
            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Watching
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Only show unread</span>
            <span className="sm:hidden">Unread</span>
            <button
              onClick={() => setOnlyUnread(!onlyUnread)}
              className={`w-10 h-5 flex items-center rounded-full ${onlyUnread ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${onlyUnread ? "translate-x-5" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-700 mb-2">
            Get instant updates in Slack
          </p>
          <button className="text-blue-600 hover:underline text-sm">
            Connect to Slack
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="p-4 border-b hover:bg-gray-50 transition relative flex gap-3 border-gray-200"
            >
              <Avatar name={n.user} avatar={n.avatar} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    {n.user}{" "}
                    <span className="text-gray-500">mentioned you</span>
                  </p>
                  {n.unread && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{n.date}</p>
                <p className="text-sm mt-1 font-medium">{n.title}</p>
                <p className="text-xs text-gray-500 truncate">{n.project}</p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {n.mention}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-blue-600">
                  <button>Reply</button>
                  <button>View thread</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreateProjectModal = () => {
    const [modalMaximized, setModalMaximized] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectTags, setProjectTags] = useState([]);
    const [projectManager, setProjectManager] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [description, setDescription] = useState('');
    const [projectImage, setProjectImage] = useState(null);
    const [projectImagePreview, setProjectImagePreview] = useState(null);
    const [createAnother, setCreateAnother] = useState(false);

    const nameCharLimit = 100;
    const descCharLimit = 500;
    const availableTags = ['Design', 'Development', 'Marketing', 'Research', 'Testing'];

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
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded-lg shadow-xl ${modalMaximized || isMobile
            ? 'w-full h-full'
            : 'w-full max-w-4xl max-h-[90vh]'
            } overflow-hidden`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-medium text-gray-900">New Project</span>
            </div>

            <div className="flex items-center gap-2">
              {!isMobile && (
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => setModalMaximized(!modalMaximized)}
                >
                  {modalMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              )}
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setCreateProjectModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: modalMaximized || isMobile ? 'calc(100vh - 200px)' : '70vh' }}>
            <p className="text-sm text-gray-600 mb-4">
              Required fields are marked with an asterisk <span className="text-red-500">*</span>
            </p>

            <div className="space-y-4 sm:space-y-6">
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

              <div>
                <label className="block text-sm font-medium mb-2">Priority Level <span className="text-red-500">*</span></label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
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

              <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-500 mb-2" />
                  <span className="text-xs text-gray-500 text-center px-2">Click to upload or drag & drop</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {projectImage && (
                  <div className="mt-2 text-xs text-gray-600 truncate">
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-t bg-gray-50 gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={createAnother} onChange={(e) => setCreateAnother(e.target.checked)} />
              <span className="text-sm">Create another</span>
            </label>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                className="flex-1 sm:flex-none px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-100"
                onClick={() => {
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
                className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                onClick={() => {
                  console.log({
                    projectName, projectTags, projectManager, deadline, priority, description, projectImage
                  });

                  // Add new project to projects array
                  if (projectName && projectManager && description) {
                    setProjects(prev => [...prev, {
                      id: prev.length + 1,
                      title: projectName,
                      type: projectTags.join(', ') || 'New Project',
                      openItems: 0,
                      doneItems: 0,
                    }]);
                  }

                  if (!createAnother) {
                    setCreateProjectModalOpen(false);
                  } else {
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
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`bg-white rounded-lg shadow-xl ${modalMaximized || isMobile
          ? 'w-full h-full'
          : 'w-full max-w-2xl max-h-[90vh]'
          } overflow-hidden`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-medium">New task</span>
            </div>
            <div className="flex items-center gap-2">
              {!isMobile && (
                <>
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
                </>
              )}
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setCreateTaskModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: modalMaximized || isMobile ? 'calc(100vh - 200px)' : '70vh' }}>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="border-b p-2 bg-gray-50 flex items-center gap-2 border-gray-200 overflow-x-auto">
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">Tt</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">•••</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">A</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">≡</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">+</button>
                    <button className="px-2 py-1 text-sm hover:bg-gray-200 rounded flex-shrink-0">※</button>
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-t bg-gray-50 gap-3">
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
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              onClick={() => {
                console.log({ workType, status, summary, description, createAnother });
                if (!createAnother) {
                  setCreateTaskModalOpen(false);
                }
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
      {/* Mobile Backdrop for Sidebar */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${isMobile
        ? `fixed left-0 top-0 h-full z-50 transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
        : sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white border-r transition-all duration-300 flex flex-col border-gray-200`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex items-center gap-2">
              {/* Logo can go here */}
            </div>
          )}
          <button
            onClick={() => {
              if (isMobile) {
                setMobileMenuOpen(false);
              } else {
                setSidebarCollapsed(!sidebarCollapsed);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {(sidebarCollapsed && !isMobile) ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2 text-blue-600 bg-blue-50 rounded">
              <User className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">For you</span>}
            </div>

            <button
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
              onClick={() => toggleSection('recent')}
            >
              {expandedSections.recent ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Recent</span>}
            </button>

            <button
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
              onClick={() => toggleSection('starred')}
            >
              {expandedSections.starred ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Star className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Starred</span>}
            </button>

            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Grid3X3 className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Apps</span>}
            </div>

            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Projects</span>}
            </div>
          </div>

          {/* Recent Projects */}
          {(!sidebarCollapsed || isMobile) && (
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
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Filters</span>}
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <BarChart3 className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Dashboards</span>}
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Users className="w-4 h-4" />
              {(!sidebarCollapsed || isMobile) && <span className="text-sm">Teams</span>}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b px-4 sm:px-6 py-3 border-gray-200">
          {isMobile ? (
            // Mobile Header Layout
            <div className="space-y-3">
              {/* Top row - Menu and Profile */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <Grid3X3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-blue-600">Jira</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Notification button */}
                  <div className="relative">
                    <button
                      onClick={() => setNotificationOpen(!notificationOpen)}
                      className="p-2 hover:bg-gray-100 rounded relative"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </div>

                  {/* Profile Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium"
                    >
                      J
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border z-50 border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                              J
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-medium">Jenil Savalia</h3>
                              <p className="text-sm text-gray-600 truncate">jenil.savalia.cd@gmail.com</p>
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

              {/* Bottom row - Search input with suggestions and Create buttons */}
              <div className="flex flex-col gap-3">
                <div className="relative" ref={searchRef}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      {filteredSuggestions.map((project) => (
                        <button
                          key={project.id}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                          onClick={() => handleSelectSuggestion(project.title)}
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    onClick={() => setCreateProjectModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Project</span>
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    onClick={() => setCreateTaskModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Task</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Desktop Header Layout
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-blue-600">SynergySphere</span>
              </div>

              {/* Search with Suggestions */}
              <div className="flex-1 max-w-md mx-4 sm:mx-8 relative" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((project) => (
                      <button
                        key={project.id}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                        onClick={() => handleSelectSuggestion(project.title)}
                      >
                        {project.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Create buttons */}
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  onClick={() => setCreateProjectModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Project</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  onClick={() => setCreateTaskModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Task</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="p-2 hover:bg-gray-100 rounded relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      2
                    </span>
                  </button>
                </div>

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
                          <div className="min-w-0">
                            <h3 className="font-medium">Jenil Savalia</h3>
                            <p className="text-sm text-gray-600 truncate">jenil.savalia.cd@gmail.com</p>
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
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">For you</h1>

            {/* Recent Projects */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-lg font-medium">Recent projects</h2>
                <button className="text-blue-600 hover:underline text-sm self-start sm:self-auto">
                  View all projects
                </button>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <Link to={`/dashboard/${project.id}`} key={project.id}>
                      <div
                        className="bg-white rounded-lg border p-4 sm:p-6 h-full border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded flex items-center justify-center">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded"></div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-1 text-sm sm:text-base truncate">{project.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{project.type}</p>

                            <div className="mb-3 sm:mb-4">
                              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                Quick links
                              </h4>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="truncate pr-2">My open work items</span>
                                  <span className="text-gray-500 flex-shrink-0">{project.openItems}</span>
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">
                                  Done work items: {project.doneItems}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm">1 board</span>
                              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No projects found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateProjectModal />
      <CreateTaskModal />
      {notificationOpen && <NotificationPanel />}

      {/* Click outside to close profile menu */}
      {profileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileMenuOpen(false)}
        />
      )}

      {/* Click outside to close notifications */}
      {notificationOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotificationOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectList;