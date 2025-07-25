import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import all your page components
import Landing from './pages/Landing/Landing';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import CeritaRakyat from './components/CeritaRakyat';
import Rules from './pages/Test/Rules';
import Test from './pages/Test/Test';
import Exam from './pages/Exam/Exam';
import Scoring from './pages/Scoring/Scoring';
import Map from './components/Map';
import Malin from './components/MalinKundang';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cerita-rakyat" element={<CeritaRakyat />} />
      <Route path="/game" element={<Game />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/test" element={<Test />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/scoring" element={<Scoring />} />
      <Route path="/map" element={<Map />} />
      <Route path="/malinkundang" element={<Malin />} />
    </Routes>
  );
}

export default App;