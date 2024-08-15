import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'

// Simulating fetched tags from backend
const allTags = [
  'sayaka', 'okiura', 'vision', 'eye', 'sayaka', 'okiura', 'vision', 'eye', 'eye', 'sayaka', 'okiura', 'vision', 'momoshiki',
  'momoshiki', 'sanji', 'sayaka', 'okiura', 'momoshiki', 'sanji', 'sayaka', 'okiura', 'momoshiki', 'sanji', 'sayaka',
  'naruto', 'sasuke', 'sakura', 'kakashi', 'hinata', 'boruto', 'itachi', 'madara', 'obito', 'pain', 'jiraiya', 'tsunade',
  'orochimaru', 'gaara', 'shikamaru', 'ino', 'choji', 'rock lee', 'neji', 'tenten', 'might guy', 'asuma', 'kurenai', 'yamato'
]

const recommendations = {
  'sayaka :': [
    'https://archiveofourown.org/works/58061623',
    'https://archiveofourown.org/works/58032988',
    'https://archiveofourown.org/works/58028152',
    'https://archiveofourown.org/works/57994006',
    'https://archiveofourown.org/works/57959860',
  ],
  'vision :': [
    'https://archiveofourown.org/works/57908641',
    'https://archiveofourown.org/works/57816841',
    'https://archiveofourown.org/works/57703315',
    'https://archiveofourown.org/works/57678076',
    'https://archiveofourown.org/works/57640432',
  ],
  'momoshiki': [
    'https://archiveofourown.org/works/57908641',
    'https://archiveofourown.org/works/57816841',
    'https://archiveofourown.org/works/57703315',
    'https://archiveofourown.org/works/57678076',
    'https://archiveofourown.org/works/57640432',
  ],
  'okiura :': [
    'https://archiveofourown.org/works/58061623',
    'https://archiveofourown.org/works/58032988',
    'https://archiveofourown.org/works/58028152',
    'https://archiveofourown.org/works/57994006',
    'https://archiveofourown.org/works/57959860',
  ],
  'sanji :': [
    'https://archiveofourown.org/works/58061623',
    'https://archiveofourown.org/works/58032988',
    'https://archiveofourown.org/works/58028152',
    'https://archiveofourown.org/works/57994006',
    'https://archiveofourown.org/works/57959860',
  ],
}

const BulletSVG = () => (
  <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 flex-shrink-0">
    <path d="M6 4.44124C4.28813 2.56223 3.14849 1.90601 1 1C2.10881 2.36504 2.78571 3.18542 2.78571 4.44124C2.78571 5.59851 2.29529 6.41651 1 7.88248C3.23029 6.82396 4.4375 6.00544 6 4.44124Z" fill="#535353" stroke="#535353" strokeLinejoin="round"/>
  </svg>
)

export default function Component() {
  const [showAllTags, setShowAllTags] = useState(false)
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 23)

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 w-full"> {/* Margin-left set to 80px */}
        <div className="container mx-auto px-4 py-8 bg-gray-100 font-sans">
          <section className="mb-8" >
            <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{marginLeft: '7vw'}}>Tags</h2>
            <div
              className="bg-white p-4 rounded-lg shadow"
              style={{ width: '81vw',marginLeft: '5vw' }} // Tags container width
            >
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
                {!showAllTags && (
                  <button
                    onClick={() => setShowAllTags(true)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                  >
                    see more...
                  </button>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{  marginLeft: '7vw' }} >Recommendations</h2>
            <div
              className="grid"
              style={{ 
                gridTemplateColumns: 'repeat(auto-fill, minmax(25.6vw, 1fr))',
                gap: '2.08vw 0vw', // vertical and horizontal gaps
                marginLeft: '5vw' 
              }}
            >
              {Object.entries(recommendations).map(([category, links]) => (
                <div
                  key={category}
                  className="bg-white p-4 rounded-lg shadow"
                  style={{ width: '25.6vw', height: '24.3vh' }} // Card width and height
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
  )
}
