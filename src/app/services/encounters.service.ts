import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EncounterRow, EncounterDetail } from '../models/encounter';

@Injectable({ providedIn: 'root' })
export class EncountersService {
  private base = environment.apiBase;
  constructor(private http: HttpClient) {}

  /** Lista termina za jednog pacijenta (Patient detail) */
  listForPatient(patientId: string): Observable<EncounterRow[]> {
    return this.http.get<EncounterRow[]>(`${this.base}/encounters/${patientId}`);
  }

  /** Kratka lista narednih termina (Dashboard) */
  myUpcoming(): Observable<EncounterRow[]> {
    return this.http.get<EncounterRow[]>(`${this.base}/encounters/my-upcoming`);
  }

  /** Detalj termina (/detail/{id}) */
  detail(id: string): Observable<EncounterDetail> {
    return this.http.get<EncounterDetail>(`${this.base}/encounters/detail/${id}`);
  }
  // (opciono zadrži alias)
  get(id: string): Observable<EncounterDetail> {
    return this.detail(id);
  }

  /** Zakaži pregled */
  schedule(patientId: string, whenIso: string, reason?: string) {
    return this.http.post<{ id: string }>(`${this.base}/encounters/schedule`, {
      patientId,
      encounterDate: whenIso, // backend očekuje EncounterDate
      reason
    });
  }

  /** Obeleži kao realizovan (PATCH) */
  complete(id: string, notes?: string) {
    return this.http.patch(`${this.base}/encounters/${id}/complete`, { notes });
  }

  /** Otkaži (PATCH) */
  cancel(id: string) {
    return this.http.patch(`${this.base}/encounters/${id}/cancel`, {});
  }
}