import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IdentityDocRow } from '../models/identity-doc';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdentityDocsService {
//   delete(id: string) {
//     throw new Error('Method not implemented.');
//   }
  private base = environment.apiBase;
  constructor(private http: HttpClient) {}

  list(patientId: string){
    return this.http.get<IdentityDocRow[]>(`${this.base}/identitydocuments/${patientId}`);
  }
delete(id: string): Observable<void> {
  return this.http.delete<void>(`${this.base}/${id}`);
}
  upload(patientId: string, body: {
    docName: string; issueDateIso?: string; expiryDateIso?: string; file: File;
  }){
    const form = new FormData();
    form.append('docName', body.docName);
    if (body.issueDateIso) form.append('issueDateIso', body.issueDateIso);
    if (body.expiryDateIso) form.append('expiryDateIso', body.expiryDateIso);
    form.append('scan', body.file); // obavezno
    return this.http.post<{ id: string }>(`${this.base}/identitydocuments/${patientId}`, form);
  }

  download(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.base}/identitydocuments/download/${id}`, {
      responseType: 'blob', observe: 'response'
    });
  }

  
}