import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { RecordsService } from '../../services/records.service';
import { IdentityDocsService } from '../../services/identity-docs.service';
import { EncountersService } from '../../services/encounters.service';
import { ConsentsService } from '../../services/consents.service';
import { PatientView } from '../../models/patient';
import { ScanRecord } from '../../models/record';
import { IdentityDocRow } from '../../models/identity-doc';
import { EncounterRow } from '../../models/encounter';
import { ConsentRow } from '../../models/consent';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-patient-detail', templateUrl: './patient-detail.component.html'
   , imports: [CommonModule, FormsModule, DatePipe]
 })
export class PatientDetailComponent implements OnInit {
id=''; info?: PatientView; tab: 'ov'|'sc'|'id'|'en'|'co' = 'ov';
recs: ScanRecord[]=[]; iddocs: IdentityDocRow[]=[]; encs: EncounterRow[]=[]; consents: ConsentRow[]=[];


// uploads/inputs
scanType='PDF'; scanFile?: File;
idDocType='ID'; idDocNumber=''; idIssue?: string; idExpiry?: string; idFile?: File;
encDate = new Date().toISOString().substring(0,16); encNotes='';
cType='Treatment'; cGiven = new Date().toISOString().substring(0,10); cExpires?: string; cFile?: File;


constructor(
private route: ActivatedRoute,
private patients: PatientsService,
private records: RecordsService,
private ids: IdentityDocsService,
private encsApi: EncountersService,
private cons: ConsentsService,
public auth: AuthService,
private toast: ToastService
){}


ngOnInit(){ this.id = this.route.snapshot.paramMap.get('id')!; this.loadAll(); }
loadAll(){ this.patients.get(this.id).subscribe(x=> this.info=x); this.refreshScans(); this.refreshIdDocs(); this.refreshEnc(); this.refreshCons(); }


// scans
onScan(e:any){ this.scanFile = e.target.files?.[0]; }
uploadScan(){ if(!this.scanFile){ this.toast.show('Select a file','warn'); return; }
this.records.upload(this.id, this.scanFile, this.scanType).subscribe({ next:_=>{ this.toast.show('Uploaded','ok'); this.refreshScans(); }, error:_=> this.toast.show('Upload failed','err') }); }
refreshScans(){ this.records.list(this.id).subscribe(x=> this.recs=x); }
downloadScan(id:string, name:string){ this.records.download(id).subscribe(blob=>{ const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url); }); }
deleteScan(id:string){ this.records.delete(id).subscribe({ next:_=>{ this.toast.show('Deleted','ok'); this.refreshScans(); }, error:_=> this.toast.show('Delete failed','err') }); }


// identity docs (Admin create)
onIdFile(e:any){ this.idFile = e.target.files?.[0]; }
saveId(){ this.ids.upload(this.id, { docType: this.idDocType, docNumber: this.idDocNumber, issueDateIso: this.idIssue, expiryDateIso: this.idExpiry, file: this.idFile || null })
.subscribe({ next:_=>{ this.toast.show('Saved','ok'); this.refreshIdDocs(); }, error:_=> this.toast.show('Save failed','err') }); }
refreshIdDocs(){ this.ids.list(this.id).subscribe(x=> this.iddocs=x); }
downloadId(id:string){ this.ids.download(id).subscribe(blob=>{ const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='IdentityDoc.bin'; a.click(); URL.revokeObjectURL(url); }); }


// encounters
saveEnc(){ this.encsApi.create(this.id, this.encDate, this.encNotes || undefined).subscribe({ next:_=>{ this.toast.show('Encounter saved','ok'); this.refreshEnc(); }, error:_=> this.toast.show('Save failed','err') }); }
refreshEnc(){ this.encsApi.list(this.id).subscribe(x=> this.encs=x); }


// consents
onCFile(e:any){ this.cFile = e.target.files?.[0]; }
saveConsent(){ this.cons.create(this.id, this.cType, this.cGiven, this.cExpires, this.cFile).subscribe({ next:_=>{ this.toast.show('Consent saved','ok'); this.refreshCons(); }, error:_=> this.toast.show('Save failed','err') }); }
refreshCons(){ this.cons.list(this.id).subscribe(x=> this.consents=x); }
}