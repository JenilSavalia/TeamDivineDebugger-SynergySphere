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
  Minimize2
} from 'lucide-react';

const ProjectList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
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

  const CreateTaskModal = () => {
    const [workType, setWorkType] = useState('Task');
    const [status, setStatus] = useState('TO DO');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [createAnother, setCreateAnother] = useState(false);
    const [modalMaximized, setModalMaximized] = useState(false);

    if (!createTaskModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`bg-white rounded-lg shadow-xl ${modalMaximized ? 'w-full h-full m-4' : 'w-full max-w-2xl mx-4 max-h-[90vh]'} overflow-hidden`}>
          <div className="flex items-center justify-between p-4 border-b">
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
                  <select className="w-full p-3 border rounded-md bg-white appearance-none pr-10">
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
                      className="w-full p-3 border rounded-md bg-white appearance-none pr-10"
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
                      className="w-full p-3 border rounded-md bg-white appearance-none pr-10"
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
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <div className="border rounded-md">
                  <div className="border-b p-2 bg-gray-50 flex items-center gap-2">
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
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
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
            
            <button 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
              onClick={() => toggleSection('recent')}
            >
              {expandedSections.recent ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {!sidebarCollapsed && <span className="text-sm">Recent</span>}
            </button>
            
            <button 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
              onClick={() => toggleSection('starred')}
            >
              {expandedSections.starred ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Star className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Starred</span>}
            </button>

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
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Filters</span>}
            </div>
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
        <header className="bg-white border-b px-6 py-3">
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
                onClick={() => setCreateTaskModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Create
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
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
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

                    <div className="border-t py-2">
                      <div className="px-4 py-2 text-sm font-medium text-gray-700">Slack</div>
                      <div className="px-4 py-2 text-sm font-medium text-gray-700">Assigned items</div>
                    </div>

                    <div className="border-t py-2">
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
                <button className="text-blue-600 hover:underline text-sm">View all projects</button>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">2025 TermScout Development</h3>
                    <p className="text-sm text-gray-600 mb-4">Team-managed business</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Quick links</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>My open work items</span>
                          <span className="text-gray-500">0</span>
                        </div>
                        <div className="text-sm text-gray-600">Done work items</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">1 board</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
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