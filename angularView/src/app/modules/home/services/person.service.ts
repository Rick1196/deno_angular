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
  $persons = new BehaviorSubject<Person[]>(this.persons);
  constructor(private _http: HttpClient) {}

  getAllPersons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<Person[]>(`${environment.baseUrl}/persons`).subscribe(
        (success) => {
          this.$persons.next(this.persons);
          resolve();
        },
        (err) => reject(err),
      );
    });
  }

  getPerson(id: string): Person {
    return this.persons.find((p) => p.id.$oid == id);
  }

  updatePerson(id: string, person: Person){
    this._http.put<any>(`${environment.baseUrl}/persons/${id}`, person)
      .subscribe(
        (success) => this.getAllPersons(),
      );
  }

  deletePerson(id:string){
    this._http.delete<any>(`${environment.baseUrl}/persons/${id}`, person)
    .subscribe(
      (success) => this.getAllPersons(),
    );
  }

  filter(filter:string, parameter:string){
    if(parameter != 'todos'){
      return this.persons.filter(p => p[filter] == parameter)
    }else{
      return this.persons;
    }
  }
}
