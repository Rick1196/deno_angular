import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from './pages/create/create.component';
import {EditComponent} from './pages/edit/edit.component';
import {ListComponent} from './pages/list/list.component';
import {HomeComponent} from './pages/home/home.component'
import { PersonResolver } from './person-resolver';

const routes: Routes = [
  {path:'',children:[
    {path:'', component:HomeComponent},
    {path:'crear',component:CreateComponent},
    {path:'editar',component:EditComponent},
    {path:'lista',component:ListComponent, resolve:{persons:PersonResolver}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
