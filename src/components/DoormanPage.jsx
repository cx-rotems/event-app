import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Doorman.css';

const DoormanPage = () => {
  const [names, setNames] = useState([]);
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
      <div className="doorman-container">
        <h2>Doorman Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('firstName')}>
                First Name {sortField === 'firstName' && '↓'}
              </th>
              <th onClick={() => handleSort('lastName')}>
                Last Name {sortField === 'lastName' && '↓'}
              </th>
              <th>Arrived</th>
            </tr>
          </thead>
          <tbody>
            {names.map((person) => (
              <tr key={person.id}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={person.arrived}
                    onChange={() => handleCheckboxChange(person.id, person.arrived)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoormanPage; 