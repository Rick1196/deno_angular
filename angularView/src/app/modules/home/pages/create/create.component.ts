import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../entities/person';
import {PersonService} from '../../services/person.service';
import * as bulmaToast from "bulma-toast";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  loading:boolean= false;//si verdadero, se bloque el boton de iniciar sesion y se muestra un spinner de carga
  person:any = {
    nombre:'',
    edad:'',
    sexo:''
  }// el equeleto para la nueva person
  //Form group para el manejo de las entradas de usuario y su validacion
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
  //inyeccion: Person Service
  constructor(private _person:PersonService) {}

  ngOnInit(): void {
  }

  save():void{
    //una vez las entradas del usuario son validas podemos crear una instancia de Person
    let newPerson:Person = new Person(this.form.controls.nombre.value,this.form.controls.edad.value,this.form.controls.sexo.value);
    this._person.createPerson(newPerson).then(suc=>{
      //creacion exitosa
      this.loading = false;
      this.form.reset();//limpiamos el formulario
      this.person =  {
        nombre:'',
        edad:'',
        sexo:''
      }//limpiamos el esqueleto de la nueva Person
      this.toastr("Persona registrada exitosamente","is-primary")
    }).catch(err=>{
      //algo sale mal
      this.loading = false;
      console.error(err);
      
    })
  }


  toastr(message: string, type: any): void {
    bulmaToast.toast({ message: message, type: type });
  }
}
