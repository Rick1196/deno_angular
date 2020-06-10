import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../entities/person';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http:HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this._http.get<Person[]>(`${environment.baseUrl}/persons`);
  }

  createPerson(person: Person): Observable<Person> {
    return this._http.post<Person>(`${environment.baseUrl}/persons`, person);
  }

  deletePerson(personId: string): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/persons/${personId}`);
  }

  updatePerson(personId: string|number, changes: Partial<Person>): Observable<any> {
    return this._http.put(`${environment.baseUrl}/persons/${personId}`, changes);
  }

}
