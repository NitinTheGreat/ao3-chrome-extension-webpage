import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useMediaQuery } from 'react-responsive';

// Demo data
const demoBookmarks = [
  { id: 1, title: "The Shoebox Project", fandom: "ladyjaida, dorkorific", tags: ["Friendship", "Humor"], date: "13 Aug 2024" },
  { id: 2, title: "Thee of Hearts", fandom: "irnan", tags: ["Steve Rogers"], date: "09 Aug 2024" },
  { id: 3, title: "Time and Tide", fandom: "what_alchemy", tags: ["Hurt", "Angst", "Romance"], date: "08 Aug 2024" },
  { id: 4, title: "The Course of Honour", fandom: "Ameona", tags: ["Court", "Romance"], date: "05 Aug 2024" },
  { id: 5, title: "A Long Winter", fandom: "littlemousling", tags: ["Friendship", "Adventure"], date: "01 Aug 2024" },
  { id: 6, title: "Drastically Redefining Protocol", fandom: "rageprufrock", tags: ["Humor", "Romance"], date: "30 Jul 2024" },
  { id: 7, title: "Twist and Shout", fandom: "Gabriel, StandByMe", tags: ["Angst", "Tragedy"], date: "27 Jul 2024" },
  { id: 8, title: "Two Foxes", fandom: "QinLong", tags: ["Naruto", "Friendship"], date: "21 Jul 2024" },
  { id: 9, title: "I am Groot", fandom: "greenlily, Marvel", tags: ["Friendship"], date: "18 Jul 2024" },
  { id: 10, title: "This, You Protect", fandom: "owlet", tags: ["Emotional", "Hurt"], date: "15 Jul 2024" },
  { id: 11, title: "How to Survive a Werewolf Attack", fandom: "Sara Holmes", tags: ["Humor", "Angst", "Action"], date: "10 Jul 2024" },
];

const allTags = ["Humor", "Angst", "Action", "Sad", "Friendship", "Hurt"];
const allFandoms = ["sayaka", "okiura", "vision", "eye", "momoshiki", "sanji"];

interface Bookmark {
  id: number;
  title: string;
  fandom: string;
  tags: string[];
  date: string;
}

export default function EnhancedBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(demoBookmarks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedFandom, setSelectedFandom] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    let filteredBookmarks = [...demoBookmarks];

    if (selectedTag) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.tags.includes(selectedTag));
    }

    if (selectedFandom) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.fandom.toLowerCase().includes(selectedFandom.toLowerCase()));
    }

    if (searchTerm) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => 
        bookmark.fandom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredBookmarks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setBookmarks(filteredBookmarks);
  }, [selectedTag, selectedFandom, searchTerm]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const handleFandomClick = (fandom: string) => {
    setSelectedFandom(fandom === selectedFandom ? "" : fandom);
  };

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
    <div className="flex flex-col md:flex-row mb-24 min-h-screen bg-gray-100">
      <Sidebar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full md:ml-16 px-4 md:px-8 py-8 font-sans bg-gray-100"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">Bookmarks</h1>
          <div className="w-full md:w-auto md:ml-4 relative">
            <input
              type="text"
              placeholder="Search Fandoms or Titles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Tags</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Fandoms</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-wrap gap-2">
                {allFandoms.map((fandom) => (
                  <motion.button
                    key={fandom}
                    onClick={() => handleFandomClick(fandom)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedFandom === fandom
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {fandom}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Fandom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {bookmarks.map((bookmark, index) => (
                    <motion.tr 
                      key={bookmark.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bookmark.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bookmark.fandom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bookmark.tags.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bookmark.date}</td>
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

