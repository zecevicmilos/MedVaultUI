import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IdentityDocRow } from '../models/identity-doc';


@Injectable({ providedIn: 'root' })
export class IdentityDocsService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}


list(patientId: string){ return this.http.get<IdentityDocRow[]>(`${this.base}/identitydocuments/${patientId}`); }
upload(patientId: string, body: { docType: string; docNumber: string; issueDateIso?: string; expiryDateIso?: string; file?: File | null; }){
const form = new FormData();
form.append('docType', body.docType);
form.append('docNumber', body.docNumber);
if (body.issueDateIso) form.append('issueDateIso', body.issueDateIso);
if (body.expiryDateIso) form.append('expiryDateIso', body.expiryDateIso);
if (body.file) form.append('scan', body.file);
return this.http.post<{ id: string }>(`${this.base}/identitydocuments/${patientId}`, form);
}
download(id: string){ return this.http.get(`${this.base}/identitydocuments/download/${id}`, { responseType:'blob' }); }
}