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
  constructor(private _http: HttpClient) {}

  login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/login`, user).subscribe(
        (suc) => {
          this.sessionStatus.isLoggedIn = true;
          this.sessionStatus.user = user.username;
          this.$session.next(this.sessionStatus);
          // en esta seccion se debe llevar a cabo el guardado del token de autenticacion
          // ya se en localStorage o en una cookie
          resolve(suc);
        },
        (err) => reject(err),
      );
    });
  }

  register(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(`${environment.baseUrl}/auth/register`, user)
        .subscribe(
          (suc) => resolve(suc),
          (err) => reject(err),
        );
    });
  }
}
