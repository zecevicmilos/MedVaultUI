export interface PatientSummary { 
    id: string; 
    medicalRecordNumber: string; 
      firstName: string;          // << dodato
  lastName: string;           // << dodato
    createdAt: string; 
    departmentId?: string; }
export interface PatientView { 
    id: string;
    medicalRecordNumber: string; 
    firstName: string; 
    lastName: string; 
    createdAt: string; 
    departmentId?: string; }