import PropTypes from 'prop-types';
import { useState } from 'react';

const NamesTable = ({ names, handleSort, handleCheckboxChange, handleRemove, sortField, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNames = names.filter(person =>
    person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search by first or last name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredNames.map((person) => (
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
              {isAdmin && (
                <td>
                  <button onClick={() => handleRemove(person.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

NamesTable.propTypes = {
  names: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      arrived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleSort: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default NamesTable;