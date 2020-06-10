import {
  personActionTypes,
  personsLoaded,
  updatePerson,
} from "./person.actions";
import { PersonService } from "../services/person.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class PersonEffects {

    constructor(
        private personService: PersonService,
        private actions$: Actions,
        private router: Router,
      ) {}

  loadPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personActionTypes.loadPersons),
      concatMap(() => this.personService.getAllPersons()),
      map((persons) => personActionTypes.personsLoaded({ persons })),
    )
  );

  createPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personActionTypes.createPerson),
      concatMap((action) => this.personService.createPerson(action.person)),
      tap(() => this.router.navigateByUrl("/lista")),
    ), { dispatch: false });

  deletePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personActionTypes.deletePerson),
      concatMap((action) => this.personService.deletePerson(action.personId)),
    ), { dispatch: false });

  updatePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personActionTypes.updatePerson),
      concatMap((action) =>
        this.personService.updatePerson(action.update.id, action.update.changes)
      ),
    ), { dispatch: false });
}
