import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../entities/person';
import {PersonService} from '../../services/person.service'
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  loading:boolean= false;
  person:any = {
    nombre:'',
    edad:'',
    sexo:''
  }
  form: FormGroup = new FormGroup({
    nombre: new FormControl(
      this.person.nombre,
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z\\s]*$"),
      ],
    ),
    edad: new FormControl(
      this.person.edad,
      [
        Validators.required,
        Validators.max(90),
        Validators.min(10),
        Validators.pattern("^[0-9]*"),
      ],
    ),
    sexo: new FormControl(this.person.sexo),
    codigo: new FormControl(this.person.codigo),
  });
  constructor(private _person:PersonService) {}

  ngOnInit(): void {
  }

  save():void{
    let newPerson:Person = new Person(this.form.controls.nombre.value,this.form.controls.edad.value,this.form.controls.sexo.value);
    console.log(newPerson);
    this._person.createPerson(newPerson).then(suc=>{
      console.log(suc);
      this.loading = false;
    }).catch(err=>{
      this.loading = false;
      console.error(err);
      
    })
  }
}
