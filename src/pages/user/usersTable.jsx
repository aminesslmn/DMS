import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Settings, CheckSquare, Square, UserPlus, Printer } from 'lucide-react';
import { history } from '../../utils';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Default column visibility state
  const defaultVisibleColumns = {
    name: true,
    department: true,
    email: true,
    hire_date: true,
    phone: true,
    position: true,
    status: true,
    address: true,
  };

  // Initialize visibleColumns from localStorage or use defaults
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedColumns = localStorage.getItem('userTableVisibleColumns');
    return savedColumns ? JSON.parse(savedColumns) : defaultVisibleColumns;
  });

  const columnLabels = {
    name: 'Name',
    address: 'Address',
    department: 'Department',
    email: 'Email',
    hire_date: 'Hire date',
    phone: 'Phone',
    position: 'Position',
    status: 'Status'
  };

  // Save to localStorage whenever visibleColumns changes
  useEffect(() => {
    localStorage.setItem('userTableVisibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, sortConfig]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://127.0.0.1:5000/api/users?page=${currentPage}&per_page=${itemsPerPage}&sort_by=${sortConfig.key || 'id'}&order=${sortConfig.direction}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.data);
      setTotalRecords(data.pagination.total_records);
      setTotalPages(data.pagination.total_pages);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };
  // Print functionality
  const handlePrint = () => {
    // Add print-specific styles
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-section, .print-section * {
          visibility: visible;
        }
        .print-section {
          position: absolute;
          left: 0;
          top: 0;
        }
        .no-print {
          display: none !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f8f9fa !important;
          color: #000;
        }
      }
    `;
    document.head.appendChild(style);

    // Trigger print
    window.print();

    // Clean up
    document.head.removeChild(style);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-3">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-3">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">Error loading users: {error}</p>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  

  

  

  const handleSort = (key) => {
    setCurrentPage(1); // Reset to first page when sorting changes
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    return diffInHours < 24 ? `${diffInHours}h ago` : `${Math.floor(diffInHours / 24)}d ago`;
  };

  const toggleColumn = (columnKey) => {
    // Prevent hiding all columns
    const currentVisibleCount = Object.values(visibleColumns).filter(Boolean).length;
    if (currentVisibleCount === 1 && visibleColumns[columnKey]) {
      return; // Don't allow hiding the last visible column
    }
    
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const resetColumnVisibility = () => {
    setVisibleColumns(defaultVisibleColumns);
  };

  const visibleColumnKeys = Object.entries(visibleColumns)
    .filter(([_, isVisible]) => isVisible)
    .map(([key]) => key);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-3">
      <div className="mb-8">
        <div className="flex flex-col justify-between items-center gap-3 mb-6">
          <p className="text-2xl font-semibold text-gray-800 justify-start w-full">User Management</p>
          <div className="flex items-center gap-3 w-full justify-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors no-print"
            >
              <Printer className="h-5 w-5" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={() => history.navigate("users/addUser")}
              className="px-4 py-2 bg-customFairouzi text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors no-print"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </button>
            <div className="relative no-print">
              <button
                onClick={() => setIsColumnSelectorOpen(!isColumnSelectorOpen)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 bg-customCreme transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Columns</span>
              </button>
              
              {isColumnSelectorOpen && (
                <div className="absolute right-0 top-full z-20 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2">
                    <div className="text-sm font-medium text-gray-700 mb-2 px-2">Show/Hide Columns</div>
                    {Object.entries(columnLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleColumn(key)}
                        className="w-full px-2 py-1.5 text-left text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                      >
                        {visibleColumns[key] ? 
                          <CheckSquare className="h-4 w-4 text-blue-500" /> : 
                          <Square className="h-4 w-4 text-gray-400" />
                        }
                        {label}
                      </button>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={resetColumnVisibility}
                        className="w-full px-2 py-1.5 text-left text-blue-600 hover:bg-gray-50 rounded text-sm"
                      >
                        Reset to Default
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 no-print">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-48 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700">{roleFilter === 'all' ? 'All Roles' : roleFilter}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
            
            {isRoleDropdownOpen && (
              <div className="absolute z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-1">
                  {['all', 'HRM', 'Document Manager', 'Viewer'].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleFilter(role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      {role === 'all' ? 'All Roles' : role}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 print-section">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              {visibleColumnKeys.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {columnLabels[header]}
                    {sortConfig.key === header && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4 no-print" /> : 
                        <ChevronDown className="h-4 w-4 no-print" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                {visibleColumnKeys.map((key) => (
                  <td key={key} className="px-6 py-4">
                    {key === 'role' ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${user.role === 'HRM' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'Document Manager' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'}`}>
                        {user[key]}
                      </span>
                    ) : key === 'status' ? (
                      <span
  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
    user.status === "Active"
      ? "bg-green-100 text-green-700"
      : user.status === "On Leave"
      ? "bg-yellow-100 text-yellow-700"
      : user.status === "Remote"
      ? "bg-blue-100 text-blue-700"
      : user.status === "Inactive"
      ? "bg-gray-100 text-gray-700"
      : user.status === "Probation"
      ? "bg-orange-100 text-orange-700"
      : "bg-purple-100 text-purple-700"
  }`}
>
  {user[key]}
</span>

                    ) : key === 'lastLogin' ? (
                      formatRelativeTime(user[key])
                    ) : (
                      <span className="text-sm text-gray-600">{user[key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between no-print">
        <span className="text-sm text-gray-600">
          Showing {Math.min(users.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(users.length, currentPage * itemsPerPage)} of {users.length} users
        </span>
        <div className="flex items-center gap-2">
          <button
           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
           disabled={currentPage === 1}
           className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <ChevronLeft className="h-5 w-5 text-gray-600" />
         </button>
         <span className="text-sm text-gray-600">
  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} users
</span>
         <button
           onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
           disabled={currentPage === totalPages}
           className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <ChevronRight className="h-5 w-5 text-gray-600" />
         </button>
       </div>
     </div>
   </div>
 );
};

export default UserManagementTable;