import { Person } from "../entities/person";
import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";

export const loadPersons = createAction(
  "[Person List] Load Persons via Service",
);

export const personsLoaded = createAction(
  "[Persons Effect] Persons Loaded Successfully",
  props<{ persons: Person[] }>(),
);

export const createPerson = createAction(
  "[Create Person Component] Create Person",
  props<{ person: Person }>(),
);

export const deletePerson = createAction(
  "[Persons List Operations] Delete Person",
  props<{ personId: string }>(),
);

export const updatePerson = createAction(
  "[Persons List Operations] Update Person",
  props<{ update: Update<Person> }>(),
);

export const personActionTypes = {
    loadPersons,
    personsLoaded,
    createPerson,
    deletePerson,
    updatePerson
}