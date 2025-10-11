
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const validateFile = (file: File): string | null => {
    // Check file extension
    if (!file.name.endsWith('.zip')) {
      return "❌ Please upload a ZIP file";
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `❌ File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`;
    }

    // Check for empty file
    if (file.size === 0) {
      return "❌ File is empty";
    }

    return null;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      onFileUpload(file);
    }
  };

  const loadSampleProject = (sampleName: string) => {
    if (disabled) return;
    const mockFile = new File(['mock'], sampleName, { type: 'application/zip' });
    onFileUpload(mockFile);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive ? 'border-blue-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}`}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".zip"
        onChange={handleChange}
        disabled={disabled}
      />
      <label htmlFor="file-upload" className={`flex flex-col items-center justify-center space-y-4 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <UploadIcon className="w-16 h-16 text-gray-500" />
        <p className="text-xl font-semibold">
          <span className="text-blue-500">Click to upload</span> or drag and drop
        </p>
        <p className="text-gray-400">Upload a .ZIP file of your codebase (max 50MB)</p>
        
        {error && (
          <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-2 rounded-lg mt-2">
            {error}
          </div>
        )}
        
        {disabled && (
            <div className="flex items-center space-x-2 pt-4">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg">Initializing Analysis Engine...</span>
            </div>
        )}
      </label>
      
      {/* Sample Projects Section */}
      <div className="mt-6 border-t border-gray-700 pt-6">
        <p className="text-gray-400 mb-3 text-sm text-center">
          Or try a sample vulnerable project:
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button 
            onClick={() => loadSampleProject('vulnerable-web-server.zip')}
            disabled={disabled}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>🌐</span> Vulnerable Web Server
          </button>
          <button 
            onClick={() => loadSampleProject('buffer-overflow-demo.zip')}
            disabled={disabled}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>💥</span> Buffer Overflow
          </button>
          <button 
            onClick={() => loadSampleProject('sql-injection-example.zip')}
            disabled={disabled}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>💉</span> SQL Injection
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
