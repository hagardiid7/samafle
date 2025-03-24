import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Users, FileText, FlaskRound as Flask } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Patients', value: '2,345', icon: Users },
    { name: 'Prescriptions Today', value: '48', icon: FileText },
    { name: 'Lab Reports Today', value: '23', icon: Flask },
    { name: 'Active Doctors', value: '12', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Prescriptions
          </h2>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Patient Name {i + 1}
                  </p>
                  <p className="text-xs text-gray-500">Dr. Smith • 2h ago</p>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-900">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Lab Reports
          </h2>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Blood Test - Patient {i + 1}
                  </p>
                  <p className="text-xs text-gray-500">Lab Tech • 3h ago</p>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-900">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}