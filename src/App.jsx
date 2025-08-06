import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient.js';
import { Toaster } from 'react-hot-toast'; // <-- استيراد المكون الجديد
import './App.css';

// Components
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HomePage from './HomePage.jsx';
import CustomDesignPage from './CustomDesignPage.jsx';
import DesignersPage from './DesignersPage.jsx';
import SeamstressesPage from './SeamstressesPage.jsx';
import LoginPage from './LoginPage.jsx';
import LandingPage from './LandingPage.jsx';
import DesignerProfilePage from './DesignerProfilePage.jsx';
import SeamstressProfilePage from './SeamstressProfilePage.jsx';
import DashboardPage from './DashboardPage.jsx';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Toaster /> {/* <-- إضافة المكون هنا */}
      <div className="min-h-screen bg-background text-foreground arabic-text">
        <Header session={session} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/join-us" element={<LandingPage />} />
            <Route path="/custom-design" element={<CustomDesignPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/designers/:id" element={<DesignerProfilePage />} />
            <Route path="/seamstresses" element={<SeamstressesPage />} />
            <Route path="/seamstresses/:id" element={<SeamstressProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;