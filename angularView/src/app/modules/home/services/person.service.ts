import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../entities/person";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  persons: Person[]; //almacen de Personsa
  editable: Person; //almacen de persona a editar
  $persons = new BehaviorSubject<Person[]>(this.persons); //Observable para notificar cambios en el almacen de personas
  $editable = new BehaviorSubject<Person>(this.editable); //Observable para notifica cambios en el almacen de person a editar
  //inyeccion de : HttpClinet
  constructor(private _http: HttpClient) {}
  //obtenemos todas las personas activas
  getAllPersons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<Person[]>(`${environment.baseUrl}/persons`).subscribe(
        (success) => {
          this.persons = success;//colocamos en el almacen todas las Personas
          this.$persons.next(this.persons);//notificamos a los subscriptores que el almacen ha cambiado
          resolve();//notificamos que la promesa se ha cumplido
        },
        (err) => reject(err),
      );
    });
  }
  //obtenemos una persona en especifico
  getPerson(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<Person>(`${environment.baseUrl}/persons/${id}`).subscribe(
        (success) => {
          this.editable = success;//guardamos la person en el almacen 
          this.$editable.next(this.editable);//notificamos a los subscriptores que el almacen ha cambiado
          resolve();//notificamos que la promesa se ha cumplido
        },
        (err) => reject(err),
      );
    });
  }

  //actualizamos una persona
  /*
    *params: id:String, person:Person
    *returns: Promesa
  */
  updatePerson(id: String, person: Person): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.put<any>(`${environment.baseUrl}/persons/${id}`, person)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }
  //eliminamos una persona
  /*
    *params: id:String
    *returns: Promesa
  */
  deletePerson(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.delete<any>(`${environment.baseUrl}/persons/${id}`)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }

  createPerson(person: Person): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/persons/`, person)
        .subscribe(
          (success) => resolve(success),
          (err) => reject(err),
        );
    });
  }

  //filtramos las personas en el almacen
  /*
    *params: field:String, parameter:Person
    *ejemplo: 'sexo', 'M'
    *returns: Person[]
  */
  filter(field: string, parameter: string):Person[] {
    if (parameter != "todos") {
      const persons = this.persons.filter((p) => p[field] == parameter);
      if (persons.length > 0) return persons;
      else return null;
    } else {
      return this.persons;
    }
  }
}
