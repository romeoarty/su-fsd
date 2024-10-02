import React from 'react';

const Card = ({ createdAt, fileName }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md flex items-center justify-center bg-white w-64 h-32 mx-auto">
      <div className="text-center">
        <p className="text-sm text-gray-900">{createdAt}</p>
        <p className="text-lg font-medium text-gray-700 mt-2">{fileName}</p>
      </div>
    </div>
  );
};

export default Card;
