import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CoinBase from './pages/CoinBase'
import HomePage from './pages/HomePage'





const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinBase />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
