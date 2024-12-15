'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useMediaQuery } from 'react-responsive';

// Demo data
const historyData = [
  { id: 1, title: "The Shoebox Project", author: "ladyjaida, dorkorific", tags: ["Friendship", "Humor"], lastVisited: "13 Aug 2024" },
  { id: 2, title: "Thee of Hearts", author: "irnan", tags: ["Steve Rogers"], lastVisited: "09 Aug 2024" },
  { id: 3, title: "Time and Tide", author: "what_alchemy", tags: ["Hurt", "Angst", "Romance"], lastVisited: "08 Aug 2024" },
  { id: 4, title: "The Course of Honour", author: "Ameona", tags: ["Court", "Romance"], lastVisited: "05 Aug 2024" },
  { id: 5, title: "A Long Winter", author: "littlemousling", tags: ["Friendship", "Adventure"], lastVisited: "01 Aug 2024" },
  { id: 6, title: "Drastically Redefining Protocol", author: "rageprufrock", tags: ["Humor", "Romance"], lastVisited: "30 Jul 2024" },
  { id: 7, title: "Twist and Shout", author: "Gabriel, StandByMe", tags: ["Angst", "Tragedy"], lastVisited: "27 Jul 2024" },
  { id: 8, title: "Two Foxes", author: "QinLong", tags: ["Naruto", "Friendship"], lastVisited: "21 Jul 2024" },
  { id: 9, title: "I am Groot", author: "greenlily", tags: ["Friendship"], lastVisited: "18 Jul 2024" },
  { id: 10, title: "This, You Protect", author: "owlet", tags: ["Emotional", "Hurt"], lastVisited: "15 Jul 2024" },
  { id: 11, title: "How to Survive a Werewolf Attack", author: "Sara Holmes", tags: ["Humor", "Angst", "Action"], lastVisited: "10 Jul 2024" },
];

export default function History() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02, backgroundColor: "#F0F8FF" }
  };

  return (
    <div className="flex flex-col md:flex-row mb-24 min-h-screen bg-gray-100">
      <Sidebar />
      <motion.div 
        className="w-full md:ml-16 px-4 md:px-8 py-8 font-sans"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-2xl font-bold text-blue-900 mb-4 md:ml-7vw"
          variants={itemVariants}
        >
          History
        </motion.h1>
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden md:w-81vw md:ml-5vw"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <motion.tr variants={itemVariants}>
                  <th className="p-4 text-left text-blue-900 font-bold">
                    Title
                   
                  </th>
                  <th className="p-4 text-left text-blue-900 font-bold">Author</th>
                  <th className="p-4 text-left text-blue-900 font-bold">Tags</th>
                  <th className="p-4 text-left text-blue-900 font-bold">Last visited</th>
                </motion.tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {historyData.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onHoverStart={() => setHoveredRow(index)}
                      onHoverEnd={() => setHoveredRow(null)}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <td className="p-4 border-t">
                        <motion.span 
                          className="text-blue-600 cursor-pointer hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.title}
                        </motion.span>
                      </td>
                      <td className="p-4 border-t">{item.author}</td>
                      <td className="p-4 border-t">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tagIndex * 0.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 border-t">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {item.lastVisited}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

