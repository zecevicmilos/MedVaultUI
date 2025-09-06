import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ConsentRow } from '../models/consent';


@Injectable({ providedIn: 'root' })
export class ConsentsService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}


list(patientId: string){ return this.http.get<ConsentRow[]>(`${this.base}/consents/${patientId}`); }
create(patientId: string, consentType: string, givenAtIso: string, expiresAtIso?: string, file?: File){
const form = new FormData();
form.append('patientId', patientId);
form.append('consentType', consentType);
form.append('givenAt', givenAtIso);
if (expiresAtIso) form.append('expiresAt', expiresAtIso);
if (file) form.append('consentDoc', file);
return this.http.post<{ id: string }>(`${this.base}/consents`, form);
}
}