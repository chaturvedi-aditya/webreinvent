'use client';
import useOnlyAuthenticated from '@/hooks/useOnlyAuthenticated';
import React from 'react';

const Dashboard = () => {
  useOnlyAuthenticated();
  return (
    <div className='bg-gray-200 min-h-screen'>
      <div className='container mx-auto py-8'>
        <h1 className='text-gray-900 text-3xl font-bold mb-4'>Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 shadow rounded'>
            <h2 className='text-xl font-semibold mb-2 text-gray-700'>
              Total Users
            </h2>
            <p className='text-2xl font-bold  text-gray-400'>500</p>
          </div>
          <div className='bg-white p-4 shadow rounded'>
            <h2 className='text-xl font-semibold mb-2  text-gray-700'>
              Total Orders
            </h2>
            <p className='text-2xl font-bold  text-gray-400'>1000</p>
          </div>
          <div className='bg-white p-4 shadow rounded'>
            <h2 className='text-xl font-semibold mb-2  text-gray-700'>
              Total Revenue
            </h2>
            <p className='text-2xl font-bold  text-gray-400'>$50,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
