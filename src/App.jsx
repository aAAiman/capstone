import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register';
import LandingPage from './components/landing-page';
import Navbar from './components/navbar';
import Footer from './components/footer';
import LogIn from './components/Login';
import DetailWisata from './components/detail-wisata';
import { AuthProvider } from './components/AuthContext';
import setupAxiosInterceptors from './components/axiosConfig';
import { AuthContext } from './components/AuthContext';
import Wishlist from './components/wishlist';
import Recommendation from './components/Recommendation';  
import ScrollToTop from './components/ScrollToTop';
import NotFoundPage from './components/Notfoundpage';
import { AnimatePresence, motion } from 'framer-motion';


function AppWrapper() {
  const location = useLocation();
  const { refreshAccessToken, logout } = useContext(AuthContext);

  const noNavFooterPaths = ['/register', '/login'];
  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  useEffect(() => {
    setupAxiosInterceptors(refreshAccessToken, logout);
  }, [refreshAccessToken, logout]);

  const pageTransition = (Component) => (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Component />
    </motion.div>
  );

  return (
    <div className="bg-black min-h-screen">
      {!hideNavFooter && <Navbar />}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={pageTransition(LandingPage)} />
          <Route path="/register" element={pageTransition(Register)} />
          <Route path="/login" element={pageTransition(LogIn)} />
          <Route path="/places/:id" element={pageTransition(DetailWisata)} />
          <Route path="/wishlist" element={pageTransition(Wishlist)} />
          <Route path="/rekomendasi" element={pageTransition(Recommendation)} />
          <Route path="*" element={pageTransition(NotFoundPage)} />
        </Routes>
      </AnimatePresence>
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
