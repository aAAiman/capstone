import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

// === Fix #2: automatically attach the access token & refresh on 401 ===
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pending = [];

api.interceptors.response.use(
  res => res,
  async err => {
    const { config, response } = err;
    if (response?.status !== 401 || config._retry) {
      return Promise.reject(err);
    }
    if (isRefreshing) {
      return new Promise(resolve => pending.push(() => resolve(api(config))));
    }
    config._retry = true;
    isRefreshing = true;
    try {
      const { data } = await api.get('/token');
      localStorage.setItem('accessToken', data.accessToken);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      pending.forEach(cb => cb());
      pending = [];
      return api(config);
    } catch (e) {
      pending = [];
      localStorage.removeItem('accessToken');
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ------------ login / logout helpers -------------
  const login = (token, userData) => { // Tambahkan parameter userData
    localStorage.setItem('accessToken', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.delete('/logout');
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // ------------ silent refresh on mount ------------
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await api.get('/token');
        localStorage.setItem('accessToken', data.accessToken);
        const userData = data.user || JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, api }} // Tambahkan user ke value
    >
      {children}
    </AuthContext.Provider>
  );
};