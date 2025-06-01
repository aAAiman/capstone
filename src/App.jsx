import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import LandingPage from './components/landing-page';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SignIn from './components/SignIn';
import DetailWisata from './components/detail-wisata';
import { AuthProvider } from './components/AuthContext';
import setupAxiosInterceptors from './components/axiosConfig';
import { AuthContext } from './components/AuthContext';

function AppWrapper() {
  const location = useLocation();
  const { refreshAccessToken, logout } = useContext(AuthContext);
  const noNavFooterPaths = ['/signup', '/signin'];
  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  useEffect(() => {
    setupAxiosInterceptors(refreshAccessToken, logout);
  }, [refreshAccessToken, logout]);

  return (
    <div className="bg-black min-h-screen">
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/places/:id" element={<DetailWisata />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;