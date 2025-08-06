import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CustomDesignPage from './components/CustomDesignPage';
import DesignersPage from './components/DesignersPage';
import SeamstressesPage from './components/SeamstressesPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground arabic-text">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-design" element={<CustomDesignPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/seamstresses" element={<SeamstressesPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

