import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useMediaQuery } from 'react-responsive';

const BulletSVG = () => (
  <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 flex-shrink-0">
    <path d="M6 4.44124C4.28813 2.56223 3.14849 1.90601 1 1C2.10881 2.36504 2.78571 3.18542 2.78571 4.44124C2.78571 5.59851 2.29529 6.41651 1 7.88248C3.23029 6.82396 4.4375 6.00544 6 4.44124Z" fill="#535353" stroke="#535353" strokeLinejoin="round"/>
  </svg>
);

interface Recommendations {
  [key: string]: string[];
}

export default function EnhancedRecommendations() {
  const [showAllTags, setShowAllTags] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendations>({});
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendations>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const tagsPerPage = isMobile ? 12 : 23;
  const tagsPerPageSmall = isMobile ? 8 : 16;

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://ao3-aiml.onrender.com/recommendations/Dipit12')
      .then(response => {
        const data = response.data;
        const tags = Object.keys(data);
        setAllTags(tags);
        setRecommendations(data);
        setFilteredRecommendations(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, tagsPerPageSmall);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setFilteredRecommendations(recommendations);
      setSelectedTag(null);
    } else {
      setFilteredRecommendations({ [tag]: recommendations[tag] });
      setSelectedTag(tag);
    }
  };

  const handleShowMore = () => setShowAllTags(true);
  const handleShowLess = () => setShowAllTags(false);

  const showButtons = allTags.length > tagsPerPageSmall;

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen mb-18 bg-gray-100">
      <Sidebar />
      <div className="w-full md:ml-16 px-4 md:px-8 py-8 font-sans">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto"
        >
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 md:ml-7vw">Tags</h2>
            <div className="bg-white p-4 rounded-lg shadow md:w-81vw md:ml-5vw">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {visibleTags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm cursor-pointer ${selectedTag === tag ? 'bg-blue-100' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </AnimatePresence>
                {showButtons && (
                  <motion.button
                    variants={itemVariants}
                    onClick={showAllTags ? handleShowLess : handleShowMore}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                  >
                    {showAllTags ? 'Show less' : 'See more...'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 md:ml-7vw">Recommendations</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {Object.entries(filteredRecommendations).map(([category, links]) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="bg-white p-4 rounded-lg shadow h-64 md:h-auto overflow-y-auto"
                  >
                    <h3 className="font-bold text-blue-900 mb-2">{category}</h3>
                    <ul className="list-none space-y-1">
                      {links.map((link, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <BulletSVG />
                          <Link
                            to={link}
                            className="text-blue-600 hover:underline text-sm break-all"
                          >
                            {link}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

