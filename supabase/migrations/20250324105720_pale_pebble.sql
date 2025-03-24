/*
  # Initial Schema Setup for Medical Management System

  1. New Tables
    - users (doctors, pharmacists, admin staff)
    - patients (patient records)
    - prescriptions (medical prescriptions)
    - lab_reports (laboratory test reports)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('doctor', 'pharmacist', 'admin')),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  contact TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  doctor_id UUID NOT NULL REFERENCES users(id),
  medicines JSONB NOT NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lab Reports table
CREATE TABLE IF NOT EXISTS lab_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  doctor_id UUID NOT NULL REFERENCES users(id),
  test_name TEXT NOT NULL,
  result TEXT NOT NULL,
  normal_range TEXT,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Patients policies
CREATE POLICY "All authenticated users can view patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin and doctors can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'doctor')
    )
  );

-- Prescriptions policies
CREATE POLICY "Doctors can create prescriptions"
  ON prescriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'doctor'
    )
  );

CREATE POLICY "All authenticated users can view prescriptions"
  ON prescriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Lab reports policies
CREATE POLICY "Doctors can create lab reports"
  ON lab_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'doctor'
    )
  );

CREATE POLICY "All authenticated users can view lab reports"
  ON lab_reports
  FOR SELECT
  TO authenticated
  USING (true);