'use client'
import React from 'react';
import { FaHome, FaShoppingCart, FaClipboardList, FaCog, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4">

      {/* Main Column */}
      <main className="lg:col-span-7">
        {/* Main Content Goes Here */}
        <div className="flex items-center mb-4">
          {/* Add your logo component or image here */}
          <img src="/logo.png"  alt="Admin Panel Logo" className="h-32 w-32 mr-2" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        {/* Add your main content here */}
      </main>
    </section>
  );
};

export default AdminDashboard;
