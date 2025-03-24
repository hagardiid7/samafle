import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, FileText, FlaskRound as Flask, LogOut, LayoutDashboard } from 'lucide-react';

export function Layout() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Prescriptions', href: '/prescriptions', icon: FileText },
    { name: 'Lab Reports', href: '/lab-reports', icon: Flask },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
              <h1 className="text-xl font-bold text-white">MedManager</h1>
            </div>
            <div className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}