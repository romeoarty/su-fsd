'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from './(components)/dropdown';
import Card from './(components)/card';

const Home = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt-asc');

  useEffect(() => {
    const fetchData = async () => {
      const [sortField, order] = sortBy.split('-');
      const response = await fetch(`/api/files?sortBy=${sortField}&order=${order}`);
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, [sortBy]);

  const handleSortChange = (selectedSort) => {
    setSortBy(selectedSort);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Dropdown onSortChange={handleSortChange} />
      <div className="mt-10 grid grid-cols-4 gap-6 mx-auto">
        {data.map((item, index) => (
          <Card key={index} createdAt={item.createdAt} fileName={item.fileName} />
        ))}
      </div>
    </div>
  );
};

export default Home;
