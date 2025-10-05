import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { DepartmentsService } from '../../services/departments.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit {
  deptName = '';

  constructor(
    public auth: AuthService,
    public router: Router,
    public toast: ToastService,
    private deps: DepartmentsService
  ) {}

  ngOnInit() {
    // za Admin-a departmentId je null → preskoči
    const role = this.auth.role?.toLowerCase();
    const deptId = this.auth.departmentId ?? undefined; // normalizuj null/undefined

    // ako ima departmentId (npr. Doctor), učitaj naziv
    if (role !='admin' && deptId) {
      this.deps.list().subscribe({
        next: list => this.deptName = list.find(x => x.id === deptId)?.name || '',
        error: _ => {}
      });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.toast.show('Logged out', 'info');
  }
}
