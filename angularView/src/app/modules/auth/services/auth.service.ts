import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from ".././../../../environments/environment";
import { rejects } from "assert";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  sessionStatus = {
    user: null,
    isLoggedIn: false,
  }; //estatus general de la sesion

  $session = new BehaviorSubject<any>(this.sessionStatus); //Subject para notificar cambios en sessionStatus
  //inyeccion de : HttpClinet
  constructor(private _http: HttpClient) {
    let token = localStorage.getItem("sessionid"); //tratamos de obtener un sessionid de localstorage
    if (token) { //si hay una sesion
      this.sessionStatus.user = localStorage.getItem("user"); //obtenemos el usuario
      this.sessionStatus.isLoggedIn = true;
      this.$session.next(this.sessionStatus); //notificamos que hay una sesion iniciada
    }
  }
  /*
   * @param user:any {username:string,password:string} 
   * @returns promise
   */
  login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/login`, user).subscribe(
        (suc) => {
          this.sessionStatus.isLoggedIn = true;
          this.sessionStatus.user = user.username;
          this.$session.next(this.sessionStatus);
          //guardamos el token en localStoarage para persistencia en caso de refrescar la pagina;
          localStorage.setItem("sessionid", suc.token);
          localStorage.setItem("user", user.username); //guardamos el username
          resolve(suc); //notificamos que la promesa se ha cumplido
        },
        (err) => reject(err),
      );
    });
  }
  /*
   * @param user:any {username:string,password:string} 
   * @returns promise
   */
  register(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/signup`, user)
        .subscribe(
          (suc) => resolve(suc),
          (err) => reject(err),
        );
    });
  }

  logout(): void {
    //reiniciamos el estado de sessionStatus
    this.sessionStatus.isLoggedIn = false;
    this.sessionStatus.user = "";
    //removemos todo en localStorage
    localStorage.removeItem("sessionid");
    localStorage.removeItem("user");
  }
}
