export interface EncounterRow { 
    id: string; 
    encounterDate: string; }
export interface EncounterDetail { 
    id: string; 
    patientId: string; 
    encounterDate: string; 
    notes?: string; }