import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyTokens from './pages/MyTokens'
import TokenizeIndex from './pages/TokenizeIndex'
import Home from './pages'

function App() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/TokenizeIndex' element={<TokenizeIndex/>} />
          <Route path='/MyTokens' element={<MyTokens/>} />
        </Routes>
      </Router>      
  )
}

export default App;