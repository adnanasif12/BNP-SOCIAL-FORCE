// API Request Utility
import { useEffect, useState } from 'react';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';



// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Set token to localStorage
export const setToken = (token) => {
  localStorage.setItem('adminToken', token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('adminToken');
};

// API request function
export const apiRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    includeToken = true,
    headers = {},
  } = options;

  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add JWT token if needed
  if (includeToken) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, config);

    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin';
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Custom hook for API calls
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiRequest(endpoint, options);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Login function
export const login = async (username, password) => {
  try {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { username, password },
      includeToken: false,
    });

    if (response.success && response.token) {
      setToken(response.token);
      return response;
    }

    throw new Error(response.message || 'Login failed');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  removeToken();
};

// Members API
export const membersApi = {
  getAll: (page = 1, limit = 20, search = '') =>
    apiRequest(`/api/members?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),

  create: (memberData) =>
    apiRequest('/api/members', {
      method: 'POST',
      body: memberData,
    }),

  update: (id, memberData) =>
    apiRequest(`/api/members?id=${id}`, {
      method: 'PUT',
      body: memberData,
    }),

  delete: (id) =>
    apiRequest(`/api/members?id=${id}`, {
      method: 'DELETE',
    }),
};

// Donations API
export const donationsApi = {
  getAll: (page = 1, limit = 20, search = '', purpose = '') =>
    apiRequest(
      `/api/donations?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}${purpose ? `&purpose=${purpose}` : ''}`
    ),

  create: (donationData) =>
    apiRequest('/api/donations', {
      method: 'POST',
      body: donationData,
    }),

  update: (id, donationData) =>
    apiRequest(`/api/donations?id=${id}`, {
      method: 'PUT',
      body: donationData,
    }),

  delete: (id) =>
    apiRequest(`/api/donations?id=${id}`, {
      method: 'DELETE',
    }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiRequest('/api/dashboard'),
};

export default apiRequest;
