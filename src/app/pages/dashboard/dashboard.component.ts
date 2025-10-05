import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../../services/encounters.service';
import { EncounterRow } from '../../models/encounter';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  loading = false;
  upcoming: EncounterRow[] = [];

  constructor(public auth: AuthService, private enc: EncountersService, private router: Router){}

  ngOnInit(){
 if (this.auth.role?.toLowerCase() === 'doctor'){
      this.loading = true;
      // koristi brzi endpoint; po želji zameni za forDoctor({...})
      this.enc.myUpcoming().subscribe({
        next: rows => { this.upcoming = rows; this.loading = false; },
        error: _ => { this.loading = false; }
      });
    }
  }

  openEncounter(id: string){ this.router.navigate(['/encounters', id]); }
}
