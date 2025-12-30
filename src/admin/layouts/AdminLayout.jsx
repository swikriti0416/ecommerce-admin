// src/admin/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Right Side: Header + Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Full width on top right */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              {/* You can dynamically change this based on route later */}
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content - Takes remaining space */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}