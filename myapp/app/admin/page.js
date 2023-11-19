'use client'
import React from 'react';
import { FaHome, FaShoppingCart, FaClipboardList, FaCog, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4">
      {/* Left Column (Aside) */}
      <aside className="lg:col-span-1">
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          {/* Category List */}
          <ul className='lg:flex lg:flex-col sm:flex sm:flex-row sm:justify-between'>
            <li className="flex items-center space-x-2 mb-2">
              <FaHome className="text-blue-500" />
              <span className="lg:inline">Dashboard</span>
            </li> 
            <li className="flex items-center space-x-2 mb-2">
              <FaShoppingCart className="text-green-500" />
              <span className="lg:inline">Products</span>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <FaClipboardList className="text-yellow-500" />
              <span className="lg:inline">Orders</span>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <FaCog className="text-red-500" />
              <span className="lg:inline">Settings</span>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <FaUsers className="text-purple-500" />
              <span className="lg:inline">Users</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Column */}
      <main className="lg:col-span-7  ">
        {/* Main Content Goes Here */}
        <div className="flex items-center mb-4">
          {/* Add your logo component or image here */}
          <img src="/your-logo.png" alt="Admin Panel Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        {/* Add your main content here */}
      </main>
    </section>
  );
};

export default AdminDashboard;
