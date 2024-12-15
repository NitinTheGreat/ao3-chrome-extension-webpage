import React from 'react';
import { motion } from 'framer-motion'

export const EmptyState = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#285599"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </motion.svg>
      <motion.h2
        className="mt-4 text-2xl font-bold text-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Start Adding Notes
      </motion.h2>
      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Click the "Add Name" button to create your first note!
      </motion.p>
    </motion.div>
  )
}

