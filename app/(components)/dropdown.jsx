import React from 'react';

const Dropdown = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    onSortChange(selectedValue);
  };

  return (
    <select
      onChange={handleSortChange}
      className="block mx-auto mt-6 w-64 p-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="createdAt-asc" className="px-4 py-2">
        Sort by Created At ASC
      </option>
      <option value="fileName-asc" className="px-4 py-2">
        Sort by File Name ASC
      </option>
      <option value="fileName-desc" className="px-4 py-2">
        Sort by File Name DESC
      </option>
    </select>
  );
};

export default Dropdown;
