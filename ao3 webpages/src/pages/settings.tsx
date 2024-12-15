import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Mail } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';

const SettingsPage: React.FC = () => {
  const [username] = useState('user');
  const [email, setEmail] = useState('user@gmail.com');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex bg-gray-100 min-h-screen mb-24">
      <Sidebar />
      <div className="flex-1 p-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header className="flex justify-between items-center mb-8" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
            <span className="text-sm text-gray-600 ml-8">
              Made with <Heart size={16} className="inline text-red-500" /> by GDSC - VIT
            </span>
          </motion.header>

          <motion.section
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="w-full md:w-2/3 space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="username"
                      value={username}
                      readOnly
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mt-6 md:mt-0 flex items-center justify-center text-white text-4xl font-bold"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {username.charAt(0).toUpperCase()}
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="bg-white rounded-lg shadow-lg p-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receive email notifications</span>
                <label className="switch">
                  <input type="checkbox" className="sr-only" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Two-factor authentication</span>
                <label className="switch">
                  <input type="checkbox" className="sr-only" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </motion.section>

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <motion.button
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
