import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import { Edit } from './pages/Edit';
import { Home } from './pages/Home';
import { New } from './pages/New';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 30 }}>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='new' element={<New />} />
          <Route path='edit/:id' element={<Edit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
