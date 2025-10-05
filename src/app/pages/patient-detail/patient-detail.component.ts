import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { RecordsService } from '../../services/records.service';
import { IdentityDocsService } from '../../services/identity-docs.service';
import { EncountersService } from '../../services/encounters.service';
import { DepartmentsService, Department } from '../../services/departments.service';
import { PatientView } from '../../models/patient';
import { ScanRecord } from '../../models/record';
import { IdentityDocRow } from '../../models/identity-doc';
import { EncounterRow } from '../../models/encounter';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe]
})
export class PatientDetailComponent implements OnInit {
  id = '';
  info?: PatientView;
  tab: 'ov' | 'sc' | 'id' | 'ap' | 'co' = 'ov';
  recs: ScanRecord[] = [];
  iddocs: IdentityDocRow[] = [];
  encs: EncounterRow[] = [];
  deptName = '';
   depts: Department[] = [];
  apStart = new Date().toISOString().substring(0, 16);
  apReason = '';
  completeId?: string;
  completeNotes = '';
  scanType = 'PDF';
  scanFile?: File;
  docName = '';
  idIssue?: string;
  idExpiry?: string;
  idFile?: File;
  isEditing = false;
  editFirstName = '';
  editLastName = '';
  editDeptId?: string;

  constructor(
    private route: ActivatedRoute,
    private patients: PatientsService,
    private records: RecordsService,
    private ids: IdentityDocsService,
    private encsApi: EncountersService,
    private depsApi: DepartmentsService,
    public auth: AuthService,
    private toast: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
    this.depsApi.list().subscribe({
      next: list => { this.depts = list; this.setDeptName(); },
      error: _ => { }
    });
  }

  private setDeptName() {
    if (!this.info?.departmentId || !this.depts?.length) return;
    const d = this.depts.find(x => x.id === this.info!.departmentId);
    this.deptName = d?.name ?? '';
  }

loadAll() {
    this.patients.get(this.id).subscribe(x => {
      this.info = x;
      this.setDeptName();

      // inicijalizuj edit polja
      this.editFirstName = x.firstName || '';
      this.editLastName = x.lastName || '';
      this.editDeptId = (x as any).departmentId || undefined;
    });
    this.refreshScans();
    this.refreshIdDocs();
    this.refreshEnc();
  }

  // ===== ADMIN AKCIJE =====
  startEdit() { this.isEditing = true; }
  cancelEdit() {
    if (!this.info) return;
    this.editFirstName = this.info.firstName || '';
    this.editLastName  = this.info.lastName  || '';
    this.editDeptId    = (this.info as any).departmentId || undefined;
    this.isEditing = false;
  }

  savePatient() {
    const body = {
      firstName: this.editFirstName.trim(),
      lastName: this.editLastName.trim(),
      departmentId: this.editDeptId || null
    };
    if (!body.firstName || !body.lastName) {
      this.toast.show('Ime i prezime su obavezni', 'warn');
      return;
    }
    this.patients.update(this.id, body).subscribe({
      next: () => { this.toast.show('Sačuvano', 'ok'); this.isEditing = false; this.loadAll(); },
      error: () => this.toast.show('Greška pri čuvanju', 'err')
    });
  }

  deletePatient() {
    if (!confirm('Da li sigurno želiš da obrišeš pacijenta? Ova akcija je trajna.')) return;
    this.patients.delete(this.id).subscribe({
      next: () => {
        this.toast.show('Pacijent obrisan', 'ok');
        this.router.navigate(['/patients']);   // ili history.back();
      },
      error: () => this.toast.show('Brisanje nije uspelo', 'err')
    });
  }

  refreshScans() { this.records.list(this.id).subscribe(x => this.recs = x); }

  private pickFilename(cd: string | null, fallback: string) {
    const m = cd ? /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(cd) : null;
    return m ? decodeURIComponent(m[1]) : fallback;
  }

  downloadScan(id: string, fallbackName: string) {
    this.records.download(id).subscribe((res: HttpResponse<Blob>) => {
      const blob = res.body!;
      const fileName = this.pickFilename(res.headers.get('content-disposition'), fallbackName || 'Scan.bin');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = fileName; a.click();
      URL.revokeObjectURL(url);
    });
  }

  deleteScan(id: string) {
    this.records.delete(id).subscribe({
      next: _ => { this.toast.show('Deleted', 'ok'); this.refreshScans(); },
      error: _ => this.toast.show('Delete failed', 'err')
    });
  }

  onIdFile(e: any) { this.idFile = e.target.files?.[0]; }

  saveId(input?: HTMLInputElement) {
  if (!this.idFile) { this.toast.show('Priložite sken dokumenta', 'warn'); return; }
  if (!this.docName.trim()) { this.toast.show('Unesite naziv dokumenta', 'warn'); return; }

  this.ids.upload(this.id, {
    docName: this.docName.trim(),
    issueDateIso: this.idIssue,
    expiryDateIso: this.idExpiry,
    file: this.idFile
  }).subscribe({
    next: _ => {
      this.toast.show('Sačuvano', 'ok');
      this.docName = '';
      this.idIssue = undefined;
      this.idExpiry = undefined;
      this.idFile = undefined;
      if (input) input.value = '';   // << očisti <input type="file">
      this.refreshIdDocs();
    },
    error: _ => this.toast.show('Greška pri čuvanju', 'err')
  });
}


  refreshIdDocs() { this.ids.list(this.id).subscribe(x => this.iddocs = x); }

  downloadId(id: string) {
    this.ids.download(id).subscribe((res: HttpResponse<Blob>) => {
      const blob = res.body!;
      const fileName = this.pickFilename(res.headers.get('content-disposition'), 'Dokument.bin');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = fileName; a.click();
      URL.revokeObjectURL(url);
    });
  }

  createAppt() {
    const whenIso = new Date(this.apStart).toISOString();
    this.encsApi.schedule(this.id, whenIso, this.apReason || undefined).subscribe({
      next: _ => { this.toast.show('Termin zakazan', 'ok'); this.apReason = ''; this.refreshEnc(); },
      error: _ => this.toast.show('Greška pri zakazivanju', 'err')
    });
  }

  refreshEnc() { this.encsApi.listForPatient(this.id).subscribe(x => this.encs = x); }

  startComplete(id: string) { this.completeId = id; this.completeNotes = ''; }

  saveComplete() {
    if (!this.completeId) return;
    this.encsApi.complete(this.completeId, this.completeNotes || undefined).subscribe({
      next: _ => { this.toast.show('Realizovano', 'ok'); this.completeId = undefined; this.refreshEnc(); },
      error: _ => this.toast.show('Greška', 'err')
    });
  }

  cancelAppt(id: string) {
    this.encsApi.cancel(id).subscribe({
      next: _ => { this.toast.show('Otkazano', 'ok'); this.refreshEnc(); },
      error: _ => this.toast.show('Greška', 'err')
    });
  }

  statusLabel(s: string) {
    switch (s) {
      case 'Scheduled': return 'Zakazano';
      case 'Completed': return 'Realizovano';
      case 'Canceled': return 'Otkazano';
      default: return s || '—';
    }
  }

  onScan(e: Event) {
  const input = e.target as HTMLInputElement;
  this.scanFile = input?.files?.[0];
}

uploadScan(input?: HTMLInputElement) {
  if (!this.scanFile) { this.toast.show('Select a file', 'warn'); return; }
  this.records.upload(this.id, this.scanFile, this.scanType).subscribe({
    next: _ => {
      this.toast.show('Uploaded', 'ok');
      this.scanFile = undefined;
      if (input) input.value = '';   // << očisti <input type="file">
      this.refreshScans();
    },
    error: _ => this.toast.show('Upload failed', 'err')
  });
}
deleteId(id: string) {
  this.ids.delete(id).subscribe({
    next: _ => { this.toast.show('Obrisano', 'ok'); this.refreshIdDocs(); },
    error: _ => this.toast.show('Brisanje nije uspelo', 'err')
  });
}


}
