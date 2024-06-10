import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const HandleRedirection: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const navigate = useNavigate();
  const { user } = authContext;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    else {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return null; // or return a loading spinner
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HandleRedirection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<HandleRedirection />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;