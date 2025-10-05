import { Component, OnInit } from '@angular/core';
import { AuditService } from '../../services/audit.service';
import { AuditRow } from '../../models/audit';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
  imports: [CommonModule, DatePipe]
})
export class AuditLogComponent implements OnInit {

  items: AuditRow[] = []; loading = false;

  constructor(private api: AuditService) { }

  ngOnInit() {
    this.loading = true; this.api.recent()
      .subscribe({
        next: x => { this.items = x; this.loading = false; },
        error: _ => this.loading = false
      });
  }
}