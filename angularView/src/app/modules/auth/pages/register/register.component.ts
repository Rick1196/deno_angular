import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MustMatch } from "../../_helpers/must-match.validators";
import { AuthService } from "../../services/auth.service";
import * as bulmaToast from "bulma-toast";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false; //si verdadero,bloquear el boton de guardado y mostrar un spinner
  form: FormGroup; //
  //inyeccion de: formbuilder, Servicio de Autenticacion, RouterModule
  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      password: new FormControl(
        "",
        [Validators.required, Validators.minLength(6)],
      ),
      confirmPassword: new FormControl("", Validators.required),
    }, {
      validator: MustMatch("password", "confirmPassword"),
    });
  }

  login(): void {
    this._auth.register(this.form.value).then((suc) => {
      //todo sale bien y el servicio regresa un 200
      this.toastr("Usuario registrado", "is-primary");//,emsaje para el usuario
      this._router.navigate(["/auth/login"]);//navegamos al login
    }).catch((err) => {
      //algo sale mal
      this.toastr("El nombre de usuario ya existe.", "is-danger");//,emsaje para el usuario
      this.loading = false;
      console.error(err);
    });
  }

  clean(): void {
    this.form.reset();//limpiamos el formulario
  }

  toastr(message: string, type: any): void {
    bulmaToast.toast({ message: message, type: type });
  }
}
