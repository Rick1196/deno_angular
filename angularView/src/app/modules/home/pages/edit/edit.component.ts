import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { Person } from "../../entities/person";
import * as bulmaToast from "bulma-toast";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  toEdit: String;
  person: Person;
  constructor(
    private _router: ActivatedRoute,
    private _person: PersonService,
    private _nav: Router,
  ) {
  }

  ngOnInit(): void {
    //nos suscribimos a los parametros de la URL para obtener la ID de la Person a editar
    this._router.queryParams.subscribe((params) => {
      this.toEdit = params.person;
      //solicitamos la informacion completa de la Persona
      this._person.getPerson(this.toEdit).then(() => {
        this._person.$editable.subscribe({
          next: (v: any) => {
            this.person = v;
            this.buildForm(); //contruimos el GroupForm con la informacion obtenida
          },
        });
      }).catch((err) => console.error(err));
    });
  }

  buildForm(): void {
    this.form = new FormGroup({
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
  }

  genCode(): void {
    //utlizamos el metodo de la clase Person para obtener un nuevo codigo
    this.form.controls["codigo"].setValue(new Person().generateCode());
  }

  save(): void {
    //enviamos el ID de la persona a modificar y los datos de la Person, y no suscribimos a la promesa
    this._person.updatePerson(this.toEdit, this.form.value).then((suc) => {
      //La promesa se cumple
      this.loading = false;
      this.toastr("Persona actualizada correctamente", "is-info");//mesaje al usuario
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  delete(): void {
    //enviamos el ID de la Persona a eliminar y nos suscribimos a la promeso
    this._person.deletePerson(this.toEdit).then((suc) => {
      //si la promesa se cumple
      this.loading = false;
      this.toastr("Persona eliminada correctamente", "is-info"); //mesaje al usuario
      this._nav.navigate(["/lista"]); //regresamos a la lista de personas
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  toastr(message: string, type: any): void {
    bulmaToast.toast({ message: message, type: type });
  }
}
