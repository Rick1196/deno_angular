import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { Person } from "../../entities/person";
import * as bulmaToast from "bulma-toast";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
    this._router.queryParams.subscribe((params) => {
      this.toEdit = params.person;
      this._person.getPerson(this.toEdit).then(() => {
        this._person.$editable.subscribe({
          next: (v: any) => {
            this.person = v;
            this.buildForm();
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
    this.form.controls["codigo"].setValue(new Person().generateCode());
  }

  save(): void {
    this._person.updatePerson(this.toEdit, this.form.value).then((suc) => {
      console.log(suc);
      this.loading = false;
      this.toastr("Persona actualizada correctamente","is-info");
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  delete(): void {
    this._person.deletePerson(this.toEdit).then((suc) => {
      console.log(suc);
      this.loading = false;
      this.toastr("Persona eliminada correctamente","is-info");
      this._nav.navigate(["/lista"]);
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }


   
  toastr(message:string,type:any):void{
    bulmaToast.toast({message:message,type:type})
  }
 
}
