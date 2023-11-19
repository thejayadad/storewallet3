'use client'
import { FaHome, FaShoppingCart, FaClipboardList, FaCog, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Aside = () => {
  const router = useRouter();

  // Helper function to check if the link is active
  const isActive = (href) => router.pathname === href;

  return (
    <section>
      <aside className="lg:col-span-1">
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          <ul className="lg:flex lg:flex-col sm:flex sm:flex-row sm:justify-between">
            <li className="flex items-center space-x-2 mb-2">
              <Link href="/admin/">
                <span className={`flex items-center space-x-2 transition duration-300 p-2 rounded-lg ${isActive('/admin/') ? 'bg-purple-300' : ''}`}>
                  <FaHome className="text-blue-500" />
                  <span>Dashboard</span>
                </span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <Link href="/admin/products">
                <span className={`flex items-center space-x-2 transition duration-300 p-2 rounded-lg ${isActive('/admin/products') ? 'bg-gray-300' : ''}`}>
                  <FaShoppingCart className="text-green-500" />
                  <span className="lg:inline">Products</span>
                </span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <Link href="/admin/orders">
                <span className={`flex items-center space-x-2 transition duration-300 p-2 rounded-lg ${isActive('/admin/orders') ? 'bg-purple-300' : ''}`}>
                  <FaClipboardList className="text-yellow-500" />
                  <span>Orders</span>
                </span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 mb-2">
              <Link href="/admin/settings">
                <span className={`flex items-center space-x-2 transition duration-300 p-2 rounded-lg ${isActive('/admin/settings') ? 'bg-gray-300' : ''}`}>
                  <FaCog className="text-red-500" />
                  <span className="lg:inline">Settings</span>
                </span>
              </Link>
            </li>
            <li className="flex items-center lg:flex lg:flex-row space-x-2 mb-2">
              <Link href="/admin/users">
                <span className={`flex items-center space-x-2 transition duration-300 p-2 rounded-lg ${isActive('/admin/users') ? 'bg-gray-300' : ''}`}>
                  <FaUsers className="text-purple-500" />
                  <span className="lg:inline">Users</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Aside;
