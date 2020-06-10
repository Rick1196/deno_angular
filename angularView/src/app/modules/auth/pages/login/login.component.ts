import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Router} from '@angular/router';
import { AuthService } from "../../services/auth.service";
import * as bulmaToast from "bulma-toast";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading:boolean = false;//si verdadero, se bloque el boton de iniciar sesion y se muestra un spinner de carga
  form: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  //inyeccion de: Servicio de autenticacion, RouterModule
  constructor(private _auth: AuthService, private _router:Router) {}

  ngOnInit(): void {
  }

  login(): void {
    this._auth.login(this.form.value).then((suc) => {
      //todo sale bien y ahora hay una sesion inciada
      this.toastr("Sesion iniciada","is-primary");//mensaje al usuario
      this._router.navigate(['/']);//navegamos a /(home)
    }).catch(err=>{
      //algo sale mal con la credenciales del usuario
      this.loading  = false;
      console.error(err);
      this.toastr("Credenciales invalidas","is-danger")
    });
  }


  clean():void{
    this.form.reset();//limpiamos el formlario
  }

  toastr(message: string, type: any): void {
    bulmaToast.toast({ message: message, type: type });
  }
}
