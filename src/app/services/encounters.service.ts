import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EncounterRow, EncounterDetail } from '../models/encounter';


@Injectable({ providedIn: 'root' })
export class EncountersService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}


list(patientId: string){ return this.http.get<EncounterRow[]>(`${this.base}/encounters/${patientId}`); }
detail(id: string){ return this.http.get<EncounterDetail>(`${this.base}/encounters/detail/${id}`); }
create(patientId: string, encounterDate: string, notes?: string){
const form = new FormData(); form.append('patientId', patientId); form.append('encounterDate', encounterDate); if (notes) form.append('notes', notes);
return this.http.post<{ id: string }>(`${this.base}/encounters`, form);
}
}