import axios from 'axios';

const setupAxiosInterceptors = (refreshAccessToken, logout) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } else {
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;