import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { PanelComponent } from './comps/panel/panel.component';


@NgModule({
  declarations: [AdminComponent, PanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
