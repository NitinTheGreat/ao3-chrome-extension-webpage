import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/userdetail', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Tokens': JSON.stringify({ accessToken, refreshToken }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setNewUsername(data.username);
      } else {
        throw new Error('Failed to fetch username');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      setError('Failed to load username. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = async () => {
    if (newUsername === username) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/update_username', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Tokens': JSON.stringify({ accessToken, refreshToken }),
        },
        body: JSON.stringify({ new_username: newUsername }),
      });

      if (response.ok) {
        setUsername(newUsername);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      setError(error.message || 'Failed to update username. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <Sidebar/>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="flex items-center">
                {isEditing ? (
                  <input
                    type="text"
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isLoading}
                  />
                ) : (
                  <span className="flex-grow px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                    {isLoading ? 'Loading...' : username}
                  </span>
                )}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="ml-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>
            {isEditing && (
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleUsernameChange}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Username'}
              </button>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Receive notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

