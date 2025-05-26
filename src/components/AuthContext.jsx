import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true     
});

// ===  Fix #2: automatically attach the access token & refresh on 401  ===
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
      // queue the request until the ongoing refresh completes
      return new Promise(resolve => pending.push(() => resolve(api(config))));
    }
    config._retry = true;
    isRefreshing = true;
    try {
      const { data } = await api.get('/token');           // refresh call
      localStorage.setItem('accessToken', data.accessToken);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      pending.forEach(cb => cb());
      pending = [];
      return api(config);                                 // replay original
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

  // ------------ login / logout helpers -------------
  const login = token => {
    localStorage.setItem('accessToken', token);  // persist across reloads
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await api.delete('/logout');
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  // ------------ silent refresh on mount ------------
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await api.get('/token'); // refresh dengan cookie
        localStorage.setItem('accessToken', data.accessToken);
        setIsAuthenticated(true);
      } catch {
        // Jika gagal refresh (cookie tidak ada / token expired), logout
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
      }
    };
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, api }}   // expose the axios instance
    >
      {children}
    </AuthContext.Provider>
  );
};
