import  { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Doorman.css';
import NamesTable from './NamesTable';

const DoormanPage = () => {
  const [names, setNames] = useState([]);
  const [sortField, setSortField] = useState('firstName');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://52.215.31.82:8080';
  
  const fetchNames = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/names`);
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchNames();
  }, [fetchNames]);

  const handleCheckboxChange = async (id, arrived) => {
    try {
      await fetch(`${API_BASE_URL}/api/names/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ arrived: !arrived }),
      });
      fetchNames();
    } catch (error) {
      console.error('Error updating arrival status:', error);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    const sortedNames = [...names].sort((a, b) => 
      a[field].localeCompare(b[field])
    );
    setNames(sortedNames);
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="admin-page">
 
      <div className="header-container" style={{ display: 'flex', alignItems: 'center' }}>
          <h2>Doorman Dashboard</h2>
          <button className="logout-button" onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      
      <NamesTable 
          names={names} 
          isAdmin={false}
          handleSort={handleSort} 
          handleCheckboxChange={handleCheckboxChange} 
          sortField={sortField} 
        />
    </div>
  );
};

export default DoormanPage; 