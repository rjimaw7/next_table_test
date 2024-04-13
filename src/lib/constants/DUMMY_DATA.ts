import type { PatientData } from '../interfaces';

export const DUMMY_DATA: PatientData[] = [
  {
    id: '54321',
    date: '2023-04-01',
    patient_name: 'John Doe',
    doctor_name: 'Dr. Smith',
    patient_phone: '555-123-4567',
    doctor_phone: '555-987-6543',
    status: 'pending'
  },
  {
    id: '67890',
    date: '2023-04-05',
    patient_name: 'Jane Doe',
    doctor_name: 'Dr. Johnson',
    patient_phone: '555-234-5678',
    doctor_phone: '555-876-5432',
    status: 'completed'
  },
  {
    id: '12345',
    date: '2023-04-01',
    patient_name: 'John Doe',
    doctor_name: 'Dr. Smith',
    patient_phone: '555-123-4567',
    doctor_phone: '555-987-6543',
    status: 'pending'
  },
  {
    id: '23456',
    date: '2023-04-05',
    patient_name: 'Jane Doe',
    doctor_name: 'Dr. Johnson',
    patient_phone: '555-234-5678',
    doctor_phone: '555-876-5432',
    status: 'completed'
  },
  {
    id: '34567',
    date: '2023-04-08',
    patient_name: 'Alice Smith',
    doctor_name: 'Dr. Brown',
    patient_phone: '555-345-6789',
    doctor_phone: '555-765-4321',
    status: 'active'
  },
  {
    id: '45678',
    date: '2023-04-12',
    patient_name: 'Bob Johnson',
    doctor_name: 'Dr. White',
    patient_phone: '555-456-7890',
    doctor_phone: '555-654-3210',
    status: 'new'
  },
  {
    id: '56789',
    date: '2023-04-15',
    patient_name: 'Emily Brown',
    doctor_name: 'Dr. Jones',
    patient_phone: '555-567-8901',
    doctor_phone: '555-543-2109',
    status: 'pending'
  }
];
