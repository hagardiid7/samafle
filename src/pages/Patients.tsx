import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Patient } from '../types';

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for demonstration
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'male',
      contact: '+1234567890',
      email: 'john@example.com',
      address: '123 Main St',
      created_at: new Date().toISOString(),
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </button>
      </div>

      <div className="flex items-center px-4 py-2 border rounded-md bg-white">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients..."
          className="ml-2 flex-1 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <li key={patient.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 truncate">
                        {patient.name}
                      </p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        {patient.age} years old
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <p>
                          {patient.gender} • {patient.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}