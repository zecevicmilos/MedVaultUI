export interface ScanRecord { 
    id: string; 
    recordType: string; 
    originalFileName: string; 
    contentType: string; 
    createdAt: string;
    originalLength: number; 
    paddingLength: number; }