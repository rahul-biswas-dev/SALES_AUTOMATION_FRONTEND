import React, { useState } from 'react';
import { runScript, getFiles } from '../services/api';

function RunScripts() {
  const [scriptPassword, setScriptPassword] = useState('');
  const [scriptName, setScriptName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessages, setStatusMessages] = useState([]);

  const handleRunScript = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await runScript(scriptPassword, scriptName);
      setMessage(response.message);
      const files = await getFiles();
      onFilesUpdate(files);
    } catch (error) {
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const runScript = async (scriptName) => {
    console.log(`Attempting to run script: ${scriptName}`); // Debug log
    setStatusMessages(prevMessages => [...prevMessages, `Attempting to run ${scriptName}...`]);
    
    try {
      const response = await fetch(`${API_BASE_URL}/run_script/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ... other headers ...
        },
        body: JSON.stringify({ script_name: scriptName }),
      });

      console.log(`Response status: ${response.status}`); // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debug log

      setStatusMessages(prevMessages => [...prevMessages, `${scriptName} executed successfully`]);
      // ... handle successful response ...
    } catch (error) {
      console.error(`Error running ${scriptName}:`, error);
      setStatusMessages(prevMessages => [...prevMessages, `Error running ${scriptName}: ${error.message}`]);
    }
  };

  return (
    <div>
      <h1>Run Scripts</h1>
      <form onSubmit={handleRunScript}>
        <label>
          Script Password:
          <input
            type="password"
            value={scriptPassword}
            onChange={(e) => setScriptPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Script Name:
          <select
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
            required
          >
            <option value="">Select a script</option>
            <option value="H013_Eco_fresh">H013_Eco_fresh</option>
            <option value="H012_JUST_ORGANIC">H012_JUST_ORGANIC</option>
            <option value="H012_GM">H012_GM</option>
          </select>
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Running...' : 'Run Script'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <h2>Status Messages</h2>
        <ul>
          {statusMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RunScripts;
