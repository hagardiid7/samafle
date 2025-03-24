import React from 'react';
import { Plus, Search } from 'lucide-react';
import { LabReport } from '../types';

export function LabReports() {
  const labReports: LabReport[] = [
    {
      id: '1',
      patient_id: '1',
      doctor_id: '1',
      test_name: 'Complete Blood Count',
      result: 'Normal',
      normal_range: '4.5-11.0 x10^9/L',
      remarks: 'All parameters within normal range',
      created_at: new Date().toISOString(),
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lab Reports</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Plus className="h-5 w-5 mr-2" />
          New Lab Report
        </button>
      </div>

      <div className="flex items-center px-4 py-2 border rounded-md bg-white">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search lab reports..."
          className="ml-2 flex-1 outline-none"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {labReports.map((report) => (
            <li key={report.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {report.test_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Patient ID: {report.patient_id} • Doctor ID: {report.doctor_id}
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Details
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Result</p>
                  <p className="mt-1 text-sm text-gray-900">{report.result}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Normal Range
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {report.normal_range}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Remarks</p>
                <p className="mt-1 text-sm text-gray-900">{report.remarks}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}