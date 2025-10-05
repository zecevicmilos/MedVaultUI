import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ScanRecord } from '../models/record';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private base = environment.apiBase;
  constructor(private http: HttpClient) {}

  list(patientId: string){
    return this.http.get<ScanRecord[]>(`${this.base}/scannedmedicalrecords/${patientId}`);
  }

  upload(patientId: string, file: File, recordType: string){
    const form = new FormData();
    form.append('file', file);
    form.append('recordType', recordType);
    return this.http.post<{ id: string }>(`${this.base}/scannedmedicalrecords/${patientId}`, form);
  }

  // VAŽNO: observe:'response' da možemo da čitamo zaglavlja (filename, content-type)
  download(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.base}/scannedmedicalrecords/download/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  delete(id: string){
    return this.http.delete(`${this.base}/scannedmedicalrecords/${id}`);
  }
}