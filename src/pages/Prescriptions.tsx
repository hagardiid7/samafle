import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Prescription } from '../types';

export function Prescriptions() {
  const prescriptions: Prescription[] = [
    {
      id: '1',
      patient_id: '1',
      doctor_id: '1',
      medicines: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '7 days',
        },
      ],
      remarks: 'Take after meals',
      created_at: new Date().toISOString(),
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Plus className="h-5 w-5 mr-2" />
          New Prescription
        </button>
      </div>

      <div className="flex items-center px-4 py-2 border rounded-md bg-white">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search prescriptions..."
          className="ml-2 flex-1 outline-none"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {prescriptions.map((prescription) => (
            <li key={prescription.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Patient ID: {prescription.patient_id}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Doctor ID: {prescription.doctor_id}
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Details
                </button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Medicines:</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {prescription.medicines.map((medicine, index) => (
                    <li key={index} className="py-2">
                      <p className="text-sm text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-500">
                        {medicine.dosage} - {medicine.frequency} for{' '}
                        {medicine.duration}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                  Remarks: {prescription.remarks}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}