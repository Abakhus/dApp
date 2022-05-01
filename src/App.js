import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyTokens from './pages/MyTokens'
import TokenizeIndex from './pages/TokenizeIndex'
import Tokenize from './pages/Tokenize'
import Home from './pages'
import TokenizeAnalisys from './pages/TokenizeAnalisys';
import MyTokensIndex from './pages/MyTokensIndex';
import MyGenomicTokens from './pages/MyGenomicTokens';

function App() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/TokenizeIndex' element={<TokenizeIndex/>} />
          <Route path='/MyTokens' element={<MyTokens/>} />
          <Route path='/MyGenomicTokens' element={<MyGenomicTokens/>} />
          <Route path='/MyTokensIndex' element={<MyTokensIndex/>} />
          <Route path='/Tokenize' element={<Tokenize/>} />
          <Route path='/TokenizeAnalisys' element={<TokenizeAnalisys/>} />
        </Routes>
      </Router>      
  )
}

export default App;