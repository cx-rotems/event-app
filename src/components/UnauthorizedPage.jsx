import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="unauthorized-container">
      <h2>Unauthorized Access</h2>
      <p>You don't have permission to access this page.</p>
      <button onClick={handleLogout}>Return to Login</button>
    </div>
  );
};

export default UnauthorizedPage; 