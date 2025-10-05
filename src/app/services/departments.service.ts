import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Department { id: string; name: string; }

@Injectable({ providedIn: 'root' })
export class DepartmentsService {
  private base = environment.apiBase;
  constructor(private http: HttpClient){}
  list(){ return this.http.get<Department[]>(`${this.base}/departments`); }
}
