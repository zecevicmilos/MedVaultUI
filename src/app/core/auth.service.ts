import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
private base = environment.apiBase;
constructor(private http: HttpClient) {}


login(userName: string, password: string) {
return this.http.post<{ token: string }>(`${this.base}/auth/login`, { userName, password })
.pipe(tap(r => localStorage.setItem('jwt', r.token)));
}
logout(){ localStorage.removeItem('jwt'); }


get token(): string | null { return localStorage.getItem('jwt'); }
get isAuthenticated(): boolean { return !!this.token; }
get role(): string | null {
const t = this.token; if (!t) return null;
const p = JSON.parse(atob(t.split('.')[1]));
return p['role'] || p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
}
get departmentId(): string | null {
const t = this.token; if (!t) return null;
const p = JSON.parse(atob(t.split('.')[1]));
return p['dept'] || null;
}
}