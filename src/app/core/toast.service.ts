import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ToastService {
items: { msg: string, kind: 'ok'|'err'|'warn'|'info' }[] = [];
show(msg: string, kind: 'ok'|'err'|'warn'|'info' = 'info'){
this.items.push({ msg, kind });
setTimeout(() => this.items.shift(), 4000);
}
}