import React, { useState } from 'react';
import { ChevronRight, Search, Filter, Calendar, List, FileText, BarChart3, Archive, MoreHorizontal, Plus } from 'lucide-react';

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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-semibold">Jira</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-2">For you</div>
              <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-2 flex items-center justify-between">
                Recent
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-2 flex items-center justify-between">
                Starred
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-2">Apps</div>
              <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-2 flex items-center justify-between">
                Projects
                <Plus className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-2">Recent</div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="text-sm text-blue-600">2025 TermScout Devel...</span>
              </div>

              <div className="mt-4 space-y-1">
                <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-1 text-sm flex items-center justify-between">
                  More projects
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-1 text-sm">Filters</div>
                <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-1 text-sm">Dashboards</div>
                <div className="text-gray-600 hover:text-gray-800 cursor-pointer py-1 text-sm">Teams</div>
              </div>
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;