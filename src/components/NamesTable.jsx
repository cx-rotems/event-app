import PropTypes from 'prop-types';

const NamesTable = ({ names, handleSort, handleCheckboxChange, sortField }) => {
  return (
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
  sortField: PropTypes.string.isRequired,
};

export default NamesTable;
