// // Tip statusa koji backend vraća
// export type EncounterStatus = 'Scheduled' | 'Completed' | 'Canceled';

// export interface EncounterRow {
//   id: string;
//   encounterDate: string;      // ISO string
//   status: EncounterStatus;    // << obavezno
//   reason?: string | null;     // opcionalno

//   patientName?: string;
//   patientId?: string;
// }

// export interface EncounterDetail {
//   id: string;
//   patientId: string;
//   encounterDate: string;      
//   status: EncounterStatus;    // << obavezno
//   reason?: string | null;
//   notes?: string | null;
//   departmentId?: string;
//   clinicianId?: string;
// }
// Tip statusa koji backend vraća
export type EncounterStatus = 'Scheduled' | 'Completed' | 'Canceled';

export interface EncounterRow {
  id: string;
  encounterDate: string;      // ISO string
  status: EncounterStatus;
  reason?: string | null;

  patientName?: string;
  patientId?: string;
}

export interface EncounterDetail {
  id: string;
  patientId: string;
  encounterDate: string;
  status: EncounterStatus;
  reason?: string | null;
  notes?: string | null;
  departmentId?: string;
  clinicianId?: string;

  // DODATO:
  patientName?: string;
  medicalRecordNumber?: string;
}
