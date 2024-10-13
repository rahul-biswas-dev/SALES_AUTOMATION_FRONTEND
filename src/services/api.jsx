import axios from 'axios';

const API_BASE_URL = 'rahulbiswasdev.pythonanywhere.com';

export const runScript = async (scriptPassword, scriptName) => {
  const response = await axios.post(`${API_BASE_URL}/run-scripts/`, {
    script_password: scriptPassword,
    script_name: scriptName,
  });
  return response.data;
};

export const getFiles = async () => {
  const response = await axios.get(`${API_BASE_URL}/get-files/`);
  return response.data;
};

export const manageFiles = async (selectedFiles, action) => {
  const response = await axios.post(`${API_BASE_URL}/manage-files/`, {
    selected_files: selectedFiles,
    action: action,
  });
  return response.data;
};
