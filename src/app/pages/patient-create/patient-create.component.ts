import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { ToastService } from '../../core/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
   styleUrls: ['./patient-create.component.scss']
,imports:[ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class PatientCreateComponent {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: PatientsService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      medicalRecordNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jmbg: ['', [Validators.required,Validators.pattern(/^\d{13}$/)]],
      address: [''],
      phone: [''],
      email: ['',Validators.email]
      // departmentId: ['']
    });
  }
    get f() { return this.form.controls; }

submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.toast.show('Please fix highlighted fields.', 'err');
      return;
    }

    // sanitize JMBG in case of spaces or pasted characters
    const v = this.form.value as any;
    const payload = {
      ...v,
      jmbg: String(v.jmbg || '').replace(/\D/g, '') // keep only digits
    };

    this.loading = true;
    this.api.create(payload).subscribe({
      next: r => {
        this.toast.show('Patient created', 'ok');
        this.router.navigate(['/patients', r.id]);
      },
      error: _ => {
        this.toast.show('Failed to create', 'err');
        this.loading = false;
      }
    });
  }
}
