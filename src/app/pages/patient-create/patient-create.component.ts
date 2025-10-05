import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { ToastService } from '../../core/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DepartmentsService, Department } from '../../services/departments.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss'],
  standalone: true,
  imports:[ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class PatientCreateComponent {
  form!: FormGroup;
  loading = false;

  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private api: PatientsService,
    private router: Router,
    private toast: ToastService,
    private deps: DepartmentsService
  ) {
    this.form = this.fb.group({
      medicalRecordNumber: ['', Validators.required],
      departmentId: ['', Validators.required],              // ⬅️ obavezno polje
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      address: [''],
      phone: [''],
      email: ['', Validators.email]
    });

    // učitaj odeljenja za dropdown
    this.deps.list().subscribe({
      next: (rows) => this.departments = rows,
      error: _ => this.toast.show('Greška pri učitavanju odeljenja', 'err')
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.toast.show('Proverite označena polja.', 'err');
      return;
    }

    // sanitize JMBG
    const v = this.form.value as any;
    const payload = {
      ...v,
      jmbg: String(v.jmbg || '').replace(/\D/g, '')
    };

    this.loading = true;
    this.api.create(payload).subscribe({
      next: r => {
        this.toast.show('Pacijent kreiran', 'ok');
        this.router.navigate(['/patients', r.id]);
      },
      error: _ => {
        this.toast.show('Neuspešno kreiranje', 'err');
        this.loading = false;
      }
    });
  }
}