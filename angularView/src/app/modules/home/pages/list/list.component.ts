import { Component, OnInit } from "@angular/core";
import { Person } from "../../entities/person";
import { PersonService } from "../../services/person.service";
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  persons: Person[] = [];
  constructor(private _person: PersonService,private _router:ActivatedRoute) {
    _person.getAllPersons().catch((error) => console.error(error));
  }
  field:string = "";
  param:string = ""
  ngOnInit(): void {
    //nos subscribimos a los parametros de url para obtner el filtro que debemos aplicar
    this._router.queryParams.subscribe((params) => {
      this.field = params.field;
      this.param = params.param;
      this.filter(this.field, this.param);
    });
    this._person.$persons.subscribe({
      next: (v: any) => {
        this.persons = v;        
      },
    });
  }
  //llamamos la la funcion filtrar para solo obtener un fragmento del almacen de Personas en person.service
  filter(field:string, parameter:string):void{
    this.persons = this._person.filter(field,parameter);
  }
}
