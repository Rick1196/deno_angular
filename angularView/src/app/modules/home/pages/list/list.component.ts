import { Component, OnInit } from '@angular/core';
import { Person } from '../../../../common/entities/person'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  persons:Person[]  =[]

  constructor() { }

  ngOnInit(): void {
    let person:Person = new Person("Ricardo Manuel","23");
    this.persons.push(person)
    this.persons.push(person)
    this.persons.push(person)
    this.persons.push(person)
    this.persons.push(person)
    this.persons.push(person)
  }

}
