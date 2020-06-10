import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../entities/person";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  persons: Person[];
  editable: Person;
  $persons = new BehaviorSubject<Person[]>(this.persons);
  $editable = new BehaviorSubject<Person>(this.editable);
  constructor(private _http: HttpClient) {}

  getAllPersons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<Person[]>(`${environment.baseUrl}/persons`).subscribe(
        (success) => {
          this.persons = success;
          this.$persons.next(this.persons);
          resolve();
        },
        (err) => reject(err),
      );
    });
  }

  getPerson(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<Person>(`${environment.baseUrl}/persons/${id}`).subscribe(
        (success) => {
          this.editable = success;
          this.$editable.next(this.editable);
          resolve();
        },
        (err) => reject(err),
      );
    });
  }

  updatePerson(id: String, person: Person): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.put<any>(`${environment.baseUrl}/persons/${id}`, person)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }

  deletePerson(id: String):Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.delete<any>(`${environment.baseUrl}/persons/${id}`)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }

  createPerson(person:Person):Promise<any>{
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/persons/`,person)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }

  filter(field: string, parameter: string) {
    if (parameter != "todos") {
      const persons =  this.persons.filter((p) => p[field] == parameter);
      if(persons.length > 0)return persons
      else return null;
    } else {
      return this.persons;
    }
  }
}
