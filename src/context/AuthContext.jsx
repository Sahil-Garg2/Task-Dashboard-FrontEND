import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('abc');

  // Check if there's a user in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', data.token);
      setUser(
        await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${data.token}` },
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
