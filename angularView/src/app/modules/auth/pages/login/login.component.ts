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
  loading:boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  constructor(private _auth: AuthService, private _router:Router) {}

  ngOnInit(): void {
  }

  login(): void {
    this._auth.login(this.form.value).then((suc) => {
      this.toastr("Sesion iniciada","is-primary");
      this._router.navigate(['/']);
      this.loading = false;
    }).catch(err=>{
      this.loading  = false;
      console.error(err);
      this.toastr("Credenciales invalidas","is-danger")
    });
  }


  clean():void{
    this.form.reset();
  }

  toastr(message: string, type: any): void {
    bulmaToast.toast({ message: message, type: type });
  }
}
