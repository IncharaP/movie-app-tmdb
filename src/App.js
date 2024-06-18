import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Popular from './Popular'; 
import Theatre from './Theatre'; 
import Kids from './Kids'; 
import Drama from './Drama'; 
import Comedy from './Comedy'; 
// eslint-disable-next-line no-unused-vars
import Layout from './Layout';
// Import Theatre component

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/Popular" element={<Popular />} />
        <Route path="/theatre" element={<Theatre />} /> 
        <Route path="/Kids" element={<Kids />} />
        <Route path="/Drama" element={<Drama />} />
        <Route path="/Comedy" element={<Comedy />} />
        
        {/* Route for theatre movies */}
        <Route path="/" element={<Main />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
