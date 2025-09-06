import React, { useState } from 'react';
import {
  ChevronRight, Search, Filter, Calendar, List, FileText, BarChart3, Archive, MoreHorizontal, Plus,
  Menu,
  Grid3X3,
  Bell,
  HelpCircle,
  Settings,
  User,
  LogOut,
  Palette,
  MessageCircle,
  Zap,
  AlertTriangle, Clock, Check} from 'lucide-react';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('Timeline');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Months');

  const milestones = [
    {
      id: 'BB2025-2',
      title: 'Milestone 1: Kickoff and Setup',
      startMonth: 'July',
      duration: 1,
      color: 'bg-blue-500'
    },
    {
      id: 'BB2025-3',
      title: 'Milestone 2: Migration and Stack Upgrade',
      startMonth: 'August',
      duration: 1,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-36',
      title: 'Milestone 2.5: Parsing and Uploading',
      startMonth: 'August',
      duration: 1,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-4',
      title: 'Milestone 3: SpaceTime Improvements',
      startMonth: 'August',
      duration: 1.5,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-43',
      title: 'Milestone 3.1: Stripe Integration & AI C...',
      startMonth: 'September',
      duration: 1,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-5',
      title: 'Milestone 4: AI Accuracy Foundation',
      startMonth: 'August',
      duration: 1.5,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-6',
      title: 'Milestone 5: Free Scan + AI Improvement',
      startMonth: 'August',
      duration: 2,
      color: 'bg-gray-600'
    },
    {
      id: 'BB2025-7',
      title: 'Milestone 6: Safe AI Badge + Final AI T...',
      startMonth: 'September',
      duration: 1,
      color: 'bg-gray-800'
    },
    {
      id: 'BB2025-8',
      title: 'Milestone 7: TrustMark + Deal Score MVP',
      startMonth: 'August',
      duration: 1.5,
      color: 'bg-gray-600'
    }
  ];

  const tableData = [
    {
      key: 'BB2025-2',
      summary: 'Milestone 1: Kickoff and Setup',
      status: 'IN PROGRESS',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-3',
      summary: 'Milestone 2: Migration and Stack Upgrade',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-36',
      summary: 'Milestone 2.5: Parsing and Uploading',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-4',
      summary: 'Milestone 3: SpaceTime Improvements',
      status: 'TO DO',
      comments: '1 comment',
      hasComments: true
    },
    {
      key: 'BB2025-43',
      summary: 'Milestone 3.1: Stripe Integration & AI CCR',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-5',
      summary: 'Milestone 4: AI Accuracy Foundation',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-6',
      summary: 'Milestone 5: Free Scan + AI Improvement',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    },
    {
      key: 'BB2025-7',
      summary: 'Milestone 6: Safe AI Badge + Final AI Tuning',
      status: 'TO DO',
      comments: 'Add comment',
      hasComments: false
    }
  ];

  const columns = [
    {
      title: 'TO DO',
      count: 4,
      tasks: [
        {
          title: 'API next steps',
          dueDate: 'Aug 29, 2025',
          isOverdue: true,
          taskId: 'BB2025-42',
          assignee: 'MN',
          assigneeColor: 'bg-orange-500'
        },
        {
          title: 'Stripe Integration',
          dueDate: 'Aug 29, 2025',
          isOverdue: true,
          taskId: 'BB2025-44',
          assignee: 'User',
          assigneeColor: 'bg-gray-400',
          hasAvatar: true
        },
        {
          title: 'AI CCR',
          dueDate: 'Sep 5, 2025',
          isOverdue: false,
          taskId: 'BB2025-45',
          assignee: 'MN',
          assigneeColor: 'bg-orange-500'
        }
      ]
    },
    {
      title: 'IN PROGRESS',
      count: 4,
      tasks: [
        {
          title: 'migrate Postgre RDS to self hosted aws vm postgre',
          taskId: 'BB2025-18',
          assignee: 'MN',
          assigneeColor: 'bg-orange-500',
          priority: 'medium'
        },
        {
          title: 'migrate SpaceTime to redux+vite',
          taskId: 'BB2025-21',
          assignee: 'User',
          assigneeColor: 'bg-gray-400',
          hasAvatar: true,
          priority: 'medium'
        },
        {
          title: 'change index change UI to speed up index creation',
          taskId: 'BB2025-24',
          assignee: 'User',
          assigneeColor: 'bg-gray-400',
          hasAvatar: true,
          priority: 'medium'
        },
        {
          title: 'Resolve Ongoing Issues',
          dueDate: 'Aug 30, 2025',
          isOverdue: true,
          hasCollapsed: true
        }
      ]
    },
    {
      title: 'DONE',
      count: 1,
      tasks: [
        {
          title: 'Manmay to set up dev environment in order to test M2 output',
          dueDate: 'Aug 28, 2025',
          taskId: 'BB2025-35',
          assignee: 'MN',
          assigneeColor: 'bg-orange-500',
          isCompleted: true
        }
      ]
    }
  ];


  const renderTaskCard = (task, index) => (
    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      {/* Task Title */}
      <h3 className="text-sm font-medium text-gray-900 mb-3 leading-relaxed">
        {task.title}
      </h3>

      {/* Due Date */}
      {task.dueDate && (
        <div className={`inline-flex items-center px-2 py-1 rounded text-xs mb-3 ${task.isOverdue
          ? 'bg-red-50 text-red-700 border border-red-200'
          : 'bg-gray-50 text-gray-600 border border-gray-200'
          }`}>
          {task.isOverdue ? (
            <AlertTriangle className="w-3 h-3 mr-1" />
          ) : (
            <Calendar className="w-3 h-3 mr-1" />
          )}
          {task.dueDate}
        </div>
      )}

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        {/* Task ID and Completion */}
        <div className="flex items-center space-x-2">
          {task.taskId && (
            <>
              <input
                type="checkbox"
                checked={task.isCompleted || false}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                readOnly
              />
              <span className="text-sm text-blue-600 font-medium">
                {task.taskId}
              </span>
              {task.isCompleted && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </>
          )}
        </div>

        {/* Priority and Assignee */}
        <div className="flex items-center space-x-2">
          {task.priority && (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
            </div>
          )}
          {task.assignee && (
            <div className={`w-6 h-6 rounded-full ${task.assigneeColor} flex items-center justify-center text-white text-xs font-medium`}>
              {task.hasAvatar ? (
                <User className="w-3 h-3" />
              ) : (
                task.assignee
              )}
            </div>
          )}
        </div>
      </div>

      {/* Collapsed Indicator */}
      {task.hasCollapsed && (
        <div className="flex justify-center mt-3 pt-3 border-t border-gray-200">
          <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
        </div>
      )}
    </div>
  );

  const teamMembers = [
    { name: 'A', avatar: 'bg-orange-500', initials: 'A' },
    { name: 'B', avatar: 'bg-black', initials: 'B' },
    { name: 'S', avatar: 'bg-blue-600', initials: 'S' },
    { name: 'JB', avatar: 'bg-yellow-500', initials: 'JB' },
    { name: 'ST', avatar: 'bg-green-600', initials: 'ST' }
  ];

  const getMonthPosition = (month) => {
    const months = { 'July': 0, 'August': 1, 'September': 2 };
    return months[month] || 0;
  };

  const getBarStyle = (milestone) => {
    const startPos = getMonthPosition(milestone.startMonth);
    const width = milestone.duration * 33.333; // Each month is roughly 33.333% of the timeline
    const left = startPos * 33.333;

    return {
      left: `${left}%`,
      width: `${width}%`
    };
  };

  return (




    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">

        {/* Main Content */}
        <div className="flex-1">
          {/* Project Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Projects</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <h1 className="text-2xl font-semibold">2025 TermScout Development</h1>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">More</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-6 mt-6 border-b border-gray-200">
              {['Summary', 'Board', 'List', 'Calendar', 'Timeline', 'Forms', 'Pages', 'Attachments', 'All work', 'Reports', 'Archived work items'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedView(tab)}
                  className={`pb-3 px-1 border-b-2 text-sm font-medium ${selectedView === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Content */}

          {
            selectedView == "Timeline" && (
              <div className="p-6 bg-white">
                {/* Search and Filter Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search timeline"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center space-x-1">
                      {teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 ${member.avatar} rounded-full flex items-center justify-center`}
                          title={member.name}
                        >
                          <span className="text-white text-xs font-semibold">{member.initials}</span>
                        </div>
                      ))}
                    </div>

                    <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Today</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Weeks</button>
                    <button
                      onClick={() => setSelectedTimeRange('Months')}
                      className={`px-3 py-1 text-sm rounded ${selectedTimeRange === 'Months'
                        ? 'bg-blue-100 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      Months
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Quarters</button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Timeline Grid */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                    <div className="p-4 font-semibold text-gray-700 border-r border-gray-200">Work</div>
                    <div className="p-4 font-semibold text-gray-700 text-center border-r border-gray-200">July</div>
                    <div className="p-4 font-semibold text-gray-700 text-center border-r border-gray-200">August</div>
                    <div className="p-4 font-semibold text-gray-700 text-center">September</div>
                  </div>

                  {/* Timeline Rows */}
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className={`grid grid-cols-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} border-b border-gray-200 hover:bg-gray-50 group`}>
                      <div className="p-4 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-purple-500 rounded"></div>
                          </div>
                          <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                            {milestone.id}
                          </span>
                          <span className="text-gray-700">{milestone.title}</span>
                        </div>
                      </div>

                      <div className="col-span-3 relative p-4">
                        <div
                          className={`${milestone.color} h-6 rounded-sm relative flex items-center justify-end pr-2`}
                          style={getBarStyle(milestone)}
                        >
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Create Row */}
                  <div className="grid grid-cols-4 bg-white border-b border-gray-200 hover:bg-gray-50">
                    <div className="p-4 border-r border-gray-200">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                        <Plus className="w-4 h-4" />
                        <span>Create</span>
                      </button>
                    </div>
                    <div className="col-span-3 p-4"></div>
                  </div>
                </div>

                {/* Current Date Indicator */}
                <div className="absolute right-6 top-48" style={{ right: '20%' }}>
                  <div className="w-px h-96 bg-blue-500"></div>
                  <div className="absolute -top-2 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>

            )
          }



          {/* List Content */}

          {
            selectedView == "List" && (
              <div className="p-6 bg-white">
                <div className="min-h-screen p-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-50 border-b border-gray-200">
                      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-600">
                        <div className="col-span-1 flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        </div>
                        <div className="col-span-1">Type</div>
                        <div className="col-span-2">Key</div>
                        <div className="col-span-3">Summary</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Comments</div>
                        <div className="col-span-1">Category</div>
                        <div className="col-span-1">Assignee</div>
                        <div className="col-span-1 flex justify-center">
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                      {tableData.map((row, index) => (
                        <div key={row.key} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                          {/* Checkbox */}
                          <div className="col-span-1 flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                          </div>

                          {/* Summary */}
                          <div className="col-span-3 flex items-center">
                            <span className="text-sm text-gray-900">{row.summary}</span>
                          </div>

                          {/* Status */}
                          <div className="col-span-2 flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'IN PROGRESS'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                              }`}>
                              {row.status}
                            </span>
                          </div>

                          {/* Comments */}
                          <div className="col-span-2 flex items-center">
                            <div className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                              <span className={row.hasComments ? 'text-gray-900 font-medium' : ''}>
                                {row.comments}
                              </span>
                            </div>
                          </div>

                          {/* Category */}
                          <div className="col-span-1"></div>

                          {/* Assignee */}
                          <div className="col-span-1"></div>

                          {/* Actions */}
                          <div className="col-span-1"></div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                        <Plus className="w-4 h-4" />
                        <span>Create</span>
                      </button>
                    </div>

                    {/* Bottom scroll indicator */}
                    <div className="bg-gray-100 h-4 flex items-center justify-between px-4">
                      <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
                      <div className="flex-1 mx-2 h-0.5 bg-gray-400 rounded"></div>
                      <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

            )
          }

          {
            selectedView == "Board" && (<div className="bg-gray-50 min-h-screen p-6">
              <div className="flex space-x-6 max-w-7xl mx-auto">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex-1 min-w-80">
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          {column.title}
                        </h2>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                          {column.count}
                        </span>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-0">
                      {column.tasks.map((task, taskIndex) => renderTaskCard(task, taskIndex))}
                    </div>

                    {/* Create Button */}
                    <button className="w-full flex items-center justify-center space-x-2 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors mt-3">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Create</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Dashboard;