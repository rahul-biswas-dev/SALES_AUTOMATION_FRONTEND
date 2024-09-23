import React, { useState, useEffect } from 'react';
import RunScripts from './components/RunScripts';
import ManageFiles from './components/ManageFiles';
import { getFiles } from './services/api';

const App = () => {
  const [files, setFiles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles();
      setFiles(files);
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : ''; // Apply theme class to body
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle dark mode
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <RunScripts onFilesUpdate={setFiles} />
      <ManageFiles files={files} onFilesUpdate={setFiles} />
    </div>
  );
};

export default App;
