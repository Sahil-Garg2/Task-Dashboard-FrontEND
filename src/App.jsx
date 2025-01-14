import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { LoginRoute } from './components/PrivateRoute';
import 'mdb-ui-kit/js/mdb.es.min.js';
import 'mdb-ui-kit/css/mdb.min.css';
import Navbar from './components/navbar';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <>
      <AuthProvider>
        <div className="row">
          <Navbar/>
          <Router>
            <Routes>
              <Route path="/" element={<LoginRoute><LoginPage /></LoginRoute>} />
              <Route path="/login" element={<LoginRoute><LoginPage /></LoginRoute>} />
              <Route path="/signup" element={<UserProvider><LoginRoute><SignupPage /></LoginRoute></UserProvider>} />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/*"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
      
    </>
  );
};

export default App;
