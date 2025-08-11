import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shortener from './pages/Shortener';
import Statistics from './pages/Statistics';
import Navigation from './components/Navigation';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/analytics" element={<Statistics />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;