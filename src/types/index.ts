export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  email: string;
  address: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  medicines: Medicine[];
  remarks: string;
  created_at: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface LabReport {
  id: string;
  patient_id: string;
  doctor_id: string;
  test_name: string;
  result: string;
  normal_range: string;
  remarks: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'doctor' | 'pharmacist' | 'admin';
  name: string;
  created_at: string;
}