import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    passwrod: new FormControl("", Validators.required),
    confirmPassword: new FormControl("",Validators.required)
  });
  constructor() {}

  ngOnInit(): void {
  }
}
