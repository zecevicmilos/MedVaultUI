import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ScanRecord } from '../models/record';


@Injectable({ providedIn: 'root' })
export class RecordsService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}


list(patientId: string){ return this.http.get<ScanRecord[]>(`${this.base}/scannedmedicalrecords/${patientId}`); }
upload(patientId: string, file: File, recordType: string){ const form = new FormData(); form.append('file', file); form.append('recordType', recordType); return this.http.post<{ id: string }>(`${this.base}/scannedmedicalrecords/${patientId}`, form); }
download(id: string){ return this.http.get(`${this.base}/scannedmedicalrecords/download/${id}`, { responseType:'blob' }); }
delete(id: string){ return this.http.delete(`${this.base}/scannedmedicalrecords/${id}`); }
}