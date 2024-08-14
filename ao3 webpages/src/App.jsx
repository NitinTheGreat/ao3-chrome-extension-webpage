import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import SignUp from '../components/SignUp';
import Dashboard from './pages/dashboard'; // Corrected import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Corrected route */}
        <Route path="/" element={<div>Hello World</div>} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
