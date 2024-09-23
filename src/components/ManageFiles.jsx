import React, { useState, useEffect } from 'react';
import { getFiles, manageFiles } from '../services/api';

const ManageFiles = ({ files, onFilesUpdate }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFiles((prev) =>
      checked ? [...prev, value] : prev.filter((file) => file !== value)
    );
  };

  const handleAction = async (action) => {
    try {
      const response = await manageFiles(selectedFiles, action);
      setMessage(response.message);
      if (action === 'delete') {
        onFilesUpdate(response.available_files);
      } else {
        const updatedFiles = await getFiles();
        onFilesUpdate(updatedFiles);
      }
      setSelectedFiles([]);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Manage Files</h1>
      {files.length > 0 ? (
        <form>
          {files.map((file) => (
            <div key={file}>
              <input
                type="checkbox"
                id={file}
                value={file}
                onChange={handleFileChange}
              />
              <label htmlFor={file}>{file}</label>
            </div>
          ))}
          <button type="button" onClick={() => handleAction('download')}>
            Download Selected Files
          </button>
          <button type="button" onClick={() => handleAction('delete')}>
            Delete Selected Files
          </button>
        </form>
      ) : (
        <p>No files available</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ManageFiles;
