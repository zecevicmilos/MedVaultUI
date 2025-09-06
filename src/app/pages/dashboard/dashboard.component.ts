import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';




@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' ,

 styleUrls: ['./dashboard.component.scss']
      ,imports: [CommonModule, RouterModule], // <— bitno
})
export class DashboardComponent { constructor(public auth: AuthService){} }