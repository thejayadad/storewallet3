'use client'
import Stats from '@/components/Dashboard/Stats/Stats';
import React from 'react';
import { FaHome, FaShoppingCart, FaClipboardList, FaCog, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  return (

      <main className="col-span-7">
        <div className="flex items-center mb-4 col-span-7">
          <img src="/logo.png"  alt="Admin Panel Logo" className="h-32 w-32 mr-2" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className='col-span-7 max-w-screen-xl mx-auto'>
          
        <Stats />
        </div>
      </main>
  );
};

export default AdminDashboard;
