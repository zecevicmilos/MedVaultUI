import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login', templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  userName = ''; password = ''; loading = false;
  constructor(private auth: AuthService, private router: Router, private toast: ToastService) { }
  submit() {
    this.loading = true;
    this.auth.login(this.userName, this.password).subscribe({
      next: _ => { this.loading = false; this.toast.show('Welcome', 'ok'); this.router.navigate(['/']); },
      error: _ => { this.loading = false; this.toast.show('Invalid credentials', 'err'); }
    });
  }
}