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
  };

  $session = new BehaviorSubject<any>(this.sessionStatus);
  constructor(private _http: HttpClient) {
    let token = localStorage.getItem('sessionid');
    if(token){//verificamps si hay una sesion
      this.sessionStatus.user = localStorage.getItem('user');
      this.sessionStatus.isLoggedIn = true;
      this.$session.next(this.sessionStatus);
    }
  }

  login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/login`, user).subscribe(
        (suc) => {
          this.sessionStatus.isLoggedIn = true;
          this.sessionStatus.user = user.username;
          this.$session.next(this.sessionStatus);
          //guardamos el token en localStoarage para persistencia en caso de refrescar la pagina;
          localStorage.setItem('sessionid',suc.token);
          localStorage.setItem('user',user.username);
          resolve(suc);
        },
        (err) => reject(err),
      );
    });
  }

  register(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/signup`, user)
        .subscribe(
          (suc) => resolve(suc),
          (err) => reject(err),
        );
    });
  }

  logout():void{
    this.sessionStatus.isLoggedIn = false;
    this.sessionStatus.user = '';
    localStorage.removeItem('sessionid');
    localStorage.removeItem('user');
  }
}
