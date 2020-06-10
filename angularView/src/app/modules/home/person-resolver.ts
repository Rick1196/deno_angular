import { arePersonsLoaded } from "./store/person.selectors";
import { loadPersons, personsLoaded } from "./store/person.actions";
import { AppState } from "../../store/reducers/index";
import { Person } from "./entities/person";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs/operators";

@Injectable()
export class PersonResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.store
      .pipe(
        select(arePersonsLoaded),
        tap((personsLoaded) => {
          if (!personsLoaded) {
            this.store.dispatch(loadPersons());
          }
        }),
        filter((personsLoaded) => personsLoaded),
        first(),
      );
  }
}
