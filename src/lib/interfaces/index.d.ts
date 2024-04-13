export interface PatientData {
  id: string;
  date: string;
  patient_name: string;
  doctor_name: string;
  patient_phone: string;
  doctor_phone: string;
  status: string;
  notes?: string;
}

export interface GetOrdersPayload {
  limit: number;
  page: number;
  searchQuery?: string;
  sort?: {
    [key: string]: 'asc' | 'desc' | string;
  } | null;
}

export interface GetOrdersResponsePayload {
  data: PatientData[];
  total: number;
}

export interface UpdatePatientDataPayload {
  patient_name: string;
  patient_phone: string;
  doctor_phone: string;
  status: string;
  notes?: string;
}
