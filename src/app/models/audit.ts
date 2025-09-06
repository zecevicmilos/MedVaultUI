export interface AuditRow { 
    id: number; 
    at: string; 
    userId?: string; 
    action: string; 
    entity: string; 
    entityId?: string; 
    success: boolean; 
    ip?: string; 
    details?: string; }