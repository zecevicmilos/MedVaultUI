import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncountersService } from '../../services/encounters.service';
import { EncounterRow, EncounterDetail } from '../../models/encounter';
import { ToastService } from '../../core/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encounter-detail',
  templateUrl: './encounter-detail.component.html',
  styleUrls: ['./encounter-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EncounterDetailComponent implements OnInit {
  id = '';
  data?: EncounterDetail;
  notes = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private api: EncountersService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.load();
  }

  load(){
    this.loading = true;
    this.api.detail(this.id).subscribe({
      next: d => { this.data = d; this.loading = false; },
      error: _ => { this.toast.show('Ne mogu da učitam pregled', 'err'); this.loading = false; }
    });
  }

  complete(){
    this.api.complete(this.id, this.notes || undefined).subscribe({
      next: _ => { this.toast.show('Označeno kao realizovano', 'ok'); this.router.navigate(['/']); },
      error: _ => this.toast.show('Greška pri snimanju', 'err')
    });
  }

  cancel(){
    this.api.cancel(this.id).subscribe({
      next: _ => { this.toast.show('Termin otkazan', 'ok'); this.router.navigate(['/']); },
      error: _ => this.toast.show('Greška pri otkazivanju', 'err')
    });
  }
}