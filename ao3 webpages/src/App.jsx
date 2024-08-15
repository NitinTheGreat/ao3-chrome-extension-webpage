import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import SignUp from '../components/SignUp';
import Dashboard from './pages/dashboard'; // Corrected import
import NotesPage from './pages/Notes';
import Bookmarks from './pages/bookmarks';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Corrected route */}
        <Route path='/notes' element={<NotesPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/" element={<div>Hello World</div>} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
