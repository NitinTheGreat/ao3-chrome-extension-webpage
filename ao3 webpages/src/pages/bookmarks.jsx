import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

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

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(demoBookmarks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedFandom, setSelectedFandom] = useState("");

  useEffect(() => {
    let filteredBookmarks = [...demoBookmarks];

    if (selectedTag) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.tags.includes(selectedTag));
    }

    if (selectedFandom) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.fandom.toLowerCase().includes(selectedFandom.toLowerCase()));
    }

    if (searchTerm) {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.fandom.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    filteredBookmarks.sort((a, b) => new Date(b.date) - new Date(a.date));

    setBookmarks(filteredBookmarks);
  }, [selectedTag, selectedFandom, searchTerm]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const handleFandomClick = (fandom) => {
    setSelectedFandom(fandom === selectedFandom ? "" : fandom);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div style={{ backgroundColor: '#F8F8F8', padding: '20px', marginLeft:'68px', fontFamily: 'Arial, sans-serif', width:'100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Bookmarks</h1>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Search Fandoms"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0 20px',
                borderRadius: '30px',
                border: '1px solid #ccc',
                width: '100%',
                maxWidth: '574px',
                height: '44px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', marginLeft:'20px', color: 'blue' }}>Tags :</h2>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '15px',
                      border: 'none',
                      backgroundColor: selectedTag === tag ? '#4A90E2' : '#F2F2F2',
                      color: selectedTag === tag ? 'white' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', marginLeft:'20px', color: 'blue' }}>Fandoms :</h2>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {allFandoms.map((fandom) => (
                  <button
                    key={fandom}
                    onClick={() => handleFandomClick(fandom)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '15px',
                      border: 'none',
                      backgroundColor: selectedFandom === fandom ? '#4A90E2' : '#F2F2F2',
                      color: selectedFandom === fandom ? 'white' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {fandom}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                <th style={{ padding: '15px 60px', textAlign: 'left', color: '#2196F3', fontWeight: 'bold' }}>Title <span style={{ color: '#757575', fontWeight: 'normal' }}></span></th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#2196F3', fontWeight: 'bold' }}>Fandom</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#2196F3', fontWeight: 'bold' }}>Tags</th>
                <th style={{ padding: '15px 60px', textAlign: 'left', color: '#2196F3', fontWeight: 'bold' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookmarks.map((bookmark, index) => (
                <tr key={bookmark.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F8F8F8' }}>
                  <td style={{ padding: '15px 60px', color: 'black', cursor: 'pointer' }}>{bookmark.title}</td>
                  <td style={{ padding: '15px' }}>{bookmark.fandom}</td>
                  <td style={{ padding: '15px' }}>{bookmark.tags.join(", ")}</td>
                  <td style={{ padding: '15px 60px' }}>{bookmark.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
