import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const BulletSVG = () => (
  <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 flex-shrink-0">
    <path d="M6 4.44124C4.28813 2.56223 3.14849 1.90601 1 1C2.10881 2.36504 2.78571 3.18542 2.78571 4.44124C2.78571 5.59851 2.29529 6.41651 1 7.88248C3.23029 6.82396 4.4375 6.00544 6 4.44124Z" fill="#535353" stroke="#535353" strokeLinejoin="round"/>
  </svg>
);

export default function Component() {
  const [showAllTags, setShowAllTags] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [filteredRecommendations, setFilteredRecommendations] = useState({});
  const [selectedTag, setSelectedTag] = useState(null); // New state for selected tag
  const tagsPerPage = 23;
  const tagsPerPageSmall = 2 * 8; // Adjust based on your tag height and container size

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('Checking tokens:', { accessToken, refreshToken });
    axios.get('https://ao3-chrome-extension-backend.onrender.com/recom',{
      headers:{
        'Tokens': JSON.stringify({ accessToken, refreshToken }),
      }
    })
      .then(response => {
        const data = response.data.Data;
        const tags = Object.keys(data);
        console.log({data:data,tags:tags});
        setAllTags(tags);
        setRecommendations(data);
        setFilteredRecommendations(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, tagsPerPageSmall);

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      // If the clicked tag is already selected, show all recommendations
      setFilteredRecommendations(recommendations);
      setSelectedTag(null);
    } else {
      // Show only recommendations related to the clicked tag
      setFilteredRecommendations({ [tag]: recommendations[tag] });
      setSelectedTag(tag);
    }
  };

  const handleShowMore = () => setShowAllTags(true);
  const handleShowLess = () => setShowAllTags(false);

  const showButtons = allTags.length > tagsPerPageSmall;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 w-full">
        <div className="container mx-auto px-4 py-8 bg-gray-100 font-sans">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{ marginLeft: '7vw' }}>Tags</h2>
            <div
              className="bg-white p-4 rounded-lg shadow"
              style={{ width: '81vw', marginLeft: '5vw' }}
            >
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm cursor-pointer ${selectedTag === tag ? 'bg-blue-100' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
                {showButtons && !showAllTags && (
                  <button
                    onClick={handleShowMore}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                  >
                    See more...
                  </button>
                )}
                {showButtons && showAllTags && (
                  <button
                    onClick={handleShowLess}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                  >
                    Show less
                  </button>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{ marginLeft: '7vw' }}>Recommendations</h2>
            <div
              className="grid"
              style={{ 
                gridTemplateColumns: 'repeat(auto-fill, minmax(25.6vw, 1fr))',
                gap: '2.08vw 0vw',
                marginLeft: '5vw',
              }}
            >
              {Object.entries(filteredRecommendations).map(([category, links]) => (
                <div
                  key={category}
                  className="bg-white p-4 rounded-lg shadow"
                  style={{ width: '25.6vw', height: '26vh', overflowY: 'auto' }}
                >
                  <h3 className="font-bold text-blue-900 mb-2">{category}</h3>
                  <ul className="list-none space-y-1">
                    {links.map((link, index) => (
                      <li key={index} className="flex items-start">
                        <BulletSVG />
                        <Link
                          to={link}
                          className="text-blue-600 hover:underline text-sm break-all"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
