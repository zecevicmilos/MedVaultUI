import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { PatientSummary } from '../../models/patient';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';


import { RouterModule } from '@angular/router';

@Component({
     selector: 'app-patients', templateUrl: './patients.component.html',
     styleUrls: ['./patients.component.scss'],
     imports: [FormsModule, DatePipe, RouterModule, CommonModule]
})
export class PatientsComponent {
     lastName = ''; jmbg = ''; items: PatientSummary[] = []; loading = false;
     constructor(private svc: PatientsService, private router: Router) { }
     search() { this.loading = true; this.svc.search(this.lastName || undefined, this.jmbg || undefined).subscribe({ next: x => { this.items = x; this.loading = false; }, error: _ => this.loading = false }); }
     open(id: string) { this.router.navigate(['/patients', id]); }
}