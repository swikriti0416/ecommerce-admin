import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Categories', path: '/admin/categories', icon: Tag },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white h-screen shadow-xl flex flex-col border-r border-gray-200">
      {/* Logo & Title */}
      <div className="p-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-600">
          ShopEasy Admin
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          E-commerce Backoffice
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 font-medium text-lg ${
                active
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={24} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-4 w-full px-5 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-lg">
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}