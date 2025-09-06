import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { AuditLogComponent } from './pages/audit-log/audit-log.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './core/http-interceptor';

@NgModule({
declarations: [
AppComponent

],
imports: 
[BrowserModule,
     
    HttpClientModule, 
    FormsModule,
     ReactiveFormsModule,
      RouterModule, 
      AppRoutingModule,
      NavbarComponent,
      LoginComponent,
DashboardComponent,
PatientsComponent,
PatientCreateComponent,
PatientDetailComponent,
AuditLogComponent
    ],
providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
bootstrap: [AppComponent]
})
export class AppModule {}