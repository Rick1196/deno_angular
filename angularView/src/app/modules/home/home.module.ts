import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { PersonCardComponent } from './comps/person-card/person-card.component';


@NgModule({
  declarations: [HomeComponent, CreateComponent, EditComponent, ListComponent, PersonCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,ReactiveFormsModule, FormsModule
  ]
})
export class HomeModule { }
