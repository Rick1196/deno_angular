import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup = new FormGroup({
    username:new FormControl('',Validators.required),
    passwrod:new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit(): void {
  }

}
