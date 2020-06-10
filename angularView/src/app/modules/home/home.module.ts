import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {PersonEffects} from './store/person.effects'
import {personReducer} from './store/person.reducers';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { PersonCardComponent } from './comps/person-card/person-card.component';
import { PersonService } from './services/person.service';


@NgModule({
  declarations: [HomeComponent, CreateComponent, EditComponent, ListComponent, PersonCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,ReactiveFormsModule, FormsModule,
    StoreModule.forFeature('persons', personReducer),
    EffectsModule.forFeature([PersonEffects])
  ],
  providers:[PersonService]
})
export class HomeModule { }
