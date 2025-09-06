import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PatientSummary, PatientView } from '../models/patient';


@Injectable({ providedIn: 'root' })
export class PatientsService {
    private base = environment.apiBase;
    constructor(private http: HttpClient) { }


    search(lastName?: string, jmbg?: string) {
        let params = new HttpParams();
        if (lastName) params = params.set('lastName', lastName);
        if (jmbg) params = params.set('jmbg', jmbg);
        return this.http.get<PatientSummary[]>(`${this.base}/patients/search`, { params });
    }
    get(id: string) { return this.http.get<PatientView>(`${this.base}/patients/${id}`); }


    create(body: {
        medicalRecordNumber: string; firstName: string; lastName: string; jmbg: string;
        address?: string; phone?: string; email?: string; departmentId?: string;
    }) {
        console.log('uslo u create'); // <-- correct
        return this.http.post<{ id: string }>(`${this.base}/patients/create`, body);
    }

}