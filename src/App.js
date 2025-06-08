import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './Editor';
import Profile from './Profile';
import Create from './Create'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />        // 👈 Entry point
        <Route path="/:username" element={<Editor />} /> // 👈 Edit profile
        <Route path="/view/:username" element={<Profile />} /> // 👈 Public view
      </Routes>
    </Router>
  );
}

export default App;
