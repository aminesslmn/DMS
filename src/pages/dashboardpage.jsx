import React from 'react';
import { 
  Users, 
  FileText, 
  UserPlus, 
  Activity, 
  ArrowUp, 
  ArrowDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const userActivityData = [
    { name: 'Mon', active: 120, inactive: 20 },
    { name: 'Tue', active: 150, inactive: 15 },
    { name: 'Wed', active: 180, inactive: 25 },
    { name: 'Thu', active: 170, inactive: 18 },
    { name: 'Fri', active: 200, inactive: 22 },
    { name: 'Sat', active: 160, inactive: 30 },
    { name: 'Sun', active: 140, inactive: 25 },
  ];

  const documentsData = [
    { name: 'Jan', documents: 450 },
    { name: 'Feb', documents: 650 },
    { name: 'Mar', documents: 850 },
    { name: 'Apr', documents: 1050 },
    { name: 'May', documents: 950 },
    { name: 'Jun', documents: 1250 },
  ];

  const recentActivity = [
    { user: 'Sarah Smith', action: 'Uploaded 15 new documents', time: '5 minutes ago', type: 'upload' },
    { user: 'John Doe', action: 'Created new user account', time: '15 minutes ago', type: 'user' },
    { user: 'Mike Wilson', action: 'Updated department info', time: '1 hour ago', type: 'edit' },
    { user: 'Emma Davis', action: 'Deleted outdated files', time: '2 hours ago', type: 'delete' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">2,847</h3>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>

          {/* Active Users Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">2,433</h3>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                <ArrowDown className="h-4 w-4" />
                3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">12,847</h3>
            <p className="text-gray-500 text-sm">Total Documents</p>
          </div>

          {/* New Users Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <UserPlus className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                18%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">127</h3>
            <p className="text-gray-500 text-sm">New Users This Month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Inactive</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stackId="1" stroke="#3B82F6" fill="#93C5FD" />
                  <Area type="monotone" dataKey="inactive" stackId="1" stroke="#EF4444" fill="#FCA5A5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Documents Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Document Uploads</h3>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={documentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="documents" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'upload' ? 'bg-blue-100' :
                  activity.type === 'user' ? 'bg-green-100' :
                  activity.type === 'edit' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {activity.type === 'upload' && <FileText className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'user' && <UserPlus className="h-5 w-5 text-green-600" />}
                  {activity.type === 'edit' && <CheckCircle2 className="h-5 w-5 text-yellow-600" />}
                  {activity.type === 'delete' && <AlertCircle className="h-5 w-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {activity.time}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;