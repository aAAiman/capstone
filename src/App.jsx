import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import LandingPage from './components/landing-page';
import Navbar from './components/navbar';
import Footer from './components/footer';

function AppWrapper() {
  const location = useLocation();

  const noNavFooterPaths = ['/signup', '/login'];

  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  return (
    <div className="bg-black min-h-screen">
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
