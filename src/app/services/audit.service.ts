import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuditRow } from '../models/audit';


@Injectable({ providedIn: 'root' })
export class AuditService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}
recent(){ return this.http.get<AuditRow[]>(`${this.base}/audit`); }
}