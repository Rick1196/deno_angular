import { Component, OnInit } from '@angular/core';
import { Person } from '../../entities/person'
import { Observable } from 'rxjs';
import {PersonService} from '../../services/person.service'
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers/index';
import {getAllPersons} from '../../store/person.selectors';
import {personActionTypes} from '../../store/person.actions';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  persons$:Observable<Person[]>;
  personToBeUpdate:Person;

  constructor(private _personService:PersonService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.persons$ =  this.store.select(getAllPersons);
  }

}
