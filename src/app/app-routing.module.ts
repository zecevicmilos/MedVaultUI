import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { AuditLogComponent } from './pages/audit-log/audit-log.component';
import { AuthGuard } from './core/auth.guard';
import { RoleGuard } from './core/role.guard';
import { EncounterDetailComponent } from './pages/encounter-detail/encounter-detail.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
{ path: 'patients/create', component: PatientCreateComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] } },
{ path: 'patients/:id', component: PatientDetailComponent, canActivate: [AuthGuard] },
{ path: 'audit', component: AuditLogComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] } },
 { path: 'encounters/:id', component: EncounterDetailComponent },
{ path: '**', redirectTo: '' }
];


@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}