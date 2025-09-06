import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, TrendingUp, FileText, Clock, MoreHorizontal, ArrowUpRight } from 'lucide-react';

const ProjectSummary = () => {
  // Sample data for charts
  const statusData = [
    { name: 'Done', value: 5, color: '#3B82F6' },
    { name: 'To Do', value: 29, color: '#EC4899' },
    { name: 'In Progress', value: 12, color: '#F59E0B' }
  ];

  const priorityData = [
    { name: 'P0', value: 0 },
    { name: 'P1', value: 30 },
    { name: 'P2', value: 40 },
    { name: 'P3', value: 5 },
    { name: 'P4', value: 2 }
  ];

  const workloadData = [
    { name: 'Unassigned', percentage: 40 },
    { name: 'manmay nathasth', percentage: 22 },
    { name: 'Spencer Lindey', percentage: 17 },
    { name: 'parth', percentage: 0 },
    { name: 'Chalira Chanda', percentage: 0 }
  ];

  const activityItems = [
    {
      user: 'manmay nathasth',
      action: 'updated field "Status" on',
      item: 'BR2005-37: Resolve Ongoing Issues',
      status: 'IN PROGRESS',
      time: '5 days ago',
      avatar: 'M'
    },
    {
      user: 'manmay nathasth',
      action: 'changed the Assignee to manmay nathasth on',
      item: 'BR2005-22: Configure RDS to self hosted and wip postgre',
      status: 'IN PROGRESS',
      time: '5 days ago',
      avatar: 'M'
    }
  ];

  const StatCard = ({ icon: Icon, title, count, subtitle, bgColor }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-gray-900">{count}</div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle}
            title="completed"
            count="2"
            subtitle="in the last 7 days"
            bgColor="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            title="updated"
            count="4"
            subtitle="in the last 7 days"
            bgColor="bg-blue-500"
          />
          <StatCard
            icon={FileText}
            title="created"
            count="0"
            subtitle="in the last 7 days"
            bgColor="bg-gray-500"
          />
          <StatCard
            icon={Clock}
            title="due soon"
            count="2"
            subtitle="in the next 7 days"
            bgColor="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Overview */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Status overview</h3>
              <button className="text-blue-600 text-sm hover:underline">View all work items</button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Get a snapshot of the status of your work items.</p>
            
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <PieChart width={192} height={192}>
                  <Pie
                    data={statusData}
                    cx={96}
                    cy={96}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">46</div>
                    <div className="text-sm text-gray-600">Total work items</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.name} {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent activity</h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Stay up to date with what's happening across the project.</p>
            
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-900">Monday, September 1, 2025</div>
              {activityItems.map((item, index) => (
                <div key={index} className="flex gap-3 pb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{item.user}</span> {item.action}{' '}
                      <button className="text-blue-600 hover:underline">{item.item}</button>
                    </div>
                    <div className="mt-1">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Breakdown */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Priority breakdown</h3>
              <button className="text-blue-600 text-sm hover:underline">
                See what your team's been focusing on
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">A quick view of how work is being prioritized.</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    className="text-sm text-gray-600"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-sm text-gray-600"
                  />
                  <Bar dataKey="value" fill="#6B7280" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Types of Work */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Types of work</h3>
              <button className="text-blue-600 text-sm hover:underline">View all items</button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Get a breakdown of work items by their type.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Type</span>
                <span className="text-sm text-gray-700">Distribution</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                    <span className="text-sm text-gray-700">Epic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '41%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">41%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm text-gray-700">Task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '41%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">41%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                    <span className="text-sm text-gray-700">Sub-task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">17%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Workload */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Team workload</h3>
              <button className="text-blue-600 text-sm hover:underline">
                Reassign work items to get the right balance
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Monitor the capacity of your team.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Assignee</span>
                <span>Work distribution</span>
              </div>
              
              {workloadData.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    {member.name === 'Unassigned' ? (
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    ) : (
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-gray-700">{member.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-600 h-2 rounded-full" 
                        style={{ width: `${member.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{member.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Related projects</h3>
            <p className="text-sm text-gray-600 mb-6">Use projects to manage all your work in one place and stay aligned with stakeholders.</p>
            
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full"></div>
                <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="absolute top-6 -right-8 w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute -top-4 left-8 w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                View all projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;