import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup = new FormGroup({
    nombre:new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern('^[a-zA-Z\s]*')]),
    edad:new FormControl('',[Validators.required, Validators.max(90), Validators.min(10),Validators.pattern('^[1-9]*')]),
    sexo:new FormControl(''),
    codigo:new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }

}
