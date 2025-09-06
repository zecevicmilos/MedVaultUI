import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private auth: AuthService, private toast: ToastService) {}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const t = this.auth.token;
const cloned = t ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` } }) : req;
return next.handle(cloned).pipe(catchError((err: HttpErrorResponse) => {
if (err.status === 401) this.toast.show('Session expired or unauthorized.', 'err');
else if (err.error && typeof err.error === 'string') this.toast.show(err.error, 'err');
else this.toast.show('Request failed.', 'err');
return throwError(() => err);
}));
}
}