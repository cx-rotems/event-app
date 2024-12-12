import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminPage.css';
import NamesTable from './NamesTable';

const AdminPage = () => {
  const [names, setNames] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await fetch('/api/names');
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      setFirstName('');
      setLastName('');
      fetchNames();
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    const sortedNames = [...names].sort((a, b) => 
      a[field].localeCompare(b[field])
    );
    setNames(sortedNames);
  };

  const handleCheckboxChange = async (id, arrived) => {
    try {
      await fetch(`/api/names/${id}`, {
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


  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">Add Person</button>
      </form>

      <NamesTable 
        names={names} 
        sortField={sortField} 
        handleSort={handleSort}  
        handleCheckboxChange={handleCheckboxChange} 
      />
    </div>
  );
};

export default AdminPage; 