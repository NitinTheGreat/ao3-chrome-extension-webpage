import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
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
  return (
    <div className="flex">
      <Sidebar />
    <div style={{ backgroundColor: '#F8F8F8', padding: '20px', fontFamily: 'Arial, sans-serif', marginLeft:'68px', width:'100%' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px', marginLeft: '40px' }}>History</h1>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{ padding: '20px 60px 20px 60px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>
                <span style={{ color: '#2196F3', fontWeight: 'bold' }}>Title</span>
                <span style={{ color: '#757575', fontWeight: 'normal', fontSize: '0.8em', marginLeft: '5px' }}>*Click to follow link</span>
              </th>
              <th style={{ padding: '20px 20px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>
                <span style={{ color: '#2196F3', fontWeight: 'bold' }}>Author</span>
              </th>
              <th style={{ padding: '20px 20px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>
                <span style={{ color: '#2196F3', fontWeight: 'bold' }}>Tags</span>
              </th>
              <th style={{ padding: '20px 60px 20px 20px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>
                <span style={{ color: '#2196F3', fontWeight: 'bold' }}>Last visited</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={item.id}>
                <td style={{ padding: '15px 60px', borderBottom: '1px solid #E0E0E0' }}>
                  <span style={{ color: '#2196F3', cursor: 'pointer' }}>{item.title}</span>
                </td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #E0E0E0' }}>{item.author}</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #E0E0E0' }}>{item.tags.join(", ")}</td>
                <td style={{ padding: '15px 60px 15px 20px', borderBottom: '1px solid #E0E0E0' }}>{item.lastVisited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
   </div>
  );
}