import React from 'react';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Main from './Main'; 
import SingleMovie from "./SingleMovie";// Assuming your main page component is named Main.js

import Popular from './Popular'; 
import Theatre from './Theatre'; 
import Kids from './Kids'; 
import Drama from './Drama'; 
import Comedy from './Comedy'; 
import Layout from './Layout';




const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main />} /> 
      
      <Route path="movie/:id" element={<SingleMovie />} />
      <Route path="/Popular" element={<Popular />} />
        <Route path="/theatre" element={<Theatre />} /> 
        <Route path="/Kids" element={<Kids />} />
        <Route path="/Drama" element={<Drama />} />
        <Route path="/Comedy" element={<Comedy />} />


      </Routes>
    </Router>
  );
};

export default App;
