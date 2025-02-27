import React, { useState } from 'react';
import { Upload, X, ArrowDown, GripVertical, AlertCircle } from 'lucide-react';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const [approvalSequence, setApprovalSequence] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedApprover, setDraggedApprover] = useState(null);

  // Mock users data - replace with your actual users
  const users = [
    { id: 1, name: 'John Doe', role: 'Manager' },
    { id: 2, name: 'Jane Smith', role: 'Supervisor' },
    { id: 3, name: 'Mike Johnson', role: 'Team Lead' },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleApproverSelect = (e) => {
    const userId = Number(e.target.value);
    if (!approvalSequence.find(approver => approver.id === userId)) {
      const user = users.find(u => u.id === userId);
      setApprovalSequence([...approvalSequence, { 
        id: userId, 
        name: user.name, 
        role: user.role,
        step: approvalSequence.length + 1 
      }]);
    }
  };

  const removeApprover = (userId) => {
    const newSequence = approvalSequence
      .filter(approver => approver.id !== userId)
      .map((approver, index) => ({
        ...approver,
        step: index + 1
      }));
    setApprovalSequence(newSequence);
  };

  const handleApproverDragStart = (e, index) => {
    setDraggedApprover(index);
  };

  const handleApproverDragOver = (e, index) => {
    e.preventDefault();
    if (draggedApprover === null || draggedApprover === index) return;

    const newSequence = [...approvalSequence];
    const draggedItem = newSequence[draggedApprover];
    newSequence.splice(draggedApprover, 1);
    newSequence.splice(index, 0, draggedItem);
    
    newSequence.forEach((approver, idx) => {
      approver.step = idx + 1;
    });

    setApprovalSequence(newSequence);
    setDraggedApprover(index);
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Upload Documents</h2>
          
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your files here, or{' '}
              <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium">Selected Files</h3>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      {file.name.split('.').pop().toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sequential Approval Policy */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Sequential Approval Process</h3>
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                Drag to reorder approval sequence
              </div>
            </div>

            {/* Approver Selection */}
            <div className="flex items-center space-x-2">
              <select
                onChange={handleApproverSelect}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Add approvers to sequence...</option>
                {users
                  .filter(user => !approvalSequence.find(a => a.id === user.id))
                  .map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
              </select>
            </div>

            {/* Approval Sequence */}
            {approvalSequence.length > 0 && (
              <div className="space-y-2">
                {approvalSequence.map((approver, index) => (
                  <div
                    key={approver.id}
                    draggable
                    onDragStart={(e) => handleApproverDragStart(e, index)}
                    onDragOver={(e) => handleApproverDragOver(e, index)}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-transparent hover:border-gray-200 cursor-move"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                          {approver.step}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{approver.name}</span>
                          <span className="text-sm text-gray-500">({approver.role})</span>
                        </div>
                        {index < approvalSequence.length - 1 && (
                          <div className="text-sm text-gray-500 mt-1">
                            Must approve before {approvalSequence[index + 1].name}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeApprover(approver.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Approval Flow Visualization */}
            {approvalSequence.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Approval Flow</h4>
                <div className="flex items-center justify-between">
                  {approvalSequence.map((approver, index) => (
                    <React.Fragment key={approver.id}>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="text-sm mt-2 text-center">
                          {approver.name}
                        </div>
                      </div>
                      {index < approvalSequence.length - 1 && (
                        <ArrowDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={files.length === 0 || approvalSequence.length === 0}
          >
            Upload and Start Approval Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;