// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shortener from './pages/Shortener';
import Statistics from './pages/Statistics';
import RedirectedPage from './pages/RedirectPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Shortener />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/:shortcode" element={<RedirectedPage />} />
    </Routes>
  </Router>
);

export default App;
