import { Person } from "../entities/person";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { personActionTypes, personsLoaded } from "./person.actions";

export interface PersonState extends EntityState<Person> {
  personsLoaded: boolean;
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>(
  {
    selectId: Person => Person._id.$oid
  }
);

export const initialState = adapter.getInitialState({
  personsLoaded: false,
});

export const personReducer = createReducer(
    initialState,
  
    on(personActionTypes.personsLoaded, (state, action) => {
      return adapter.addAll(
        action.persons,
        {...state, personsLoaded: true}
      );
    }),
  
    on(personActionTypes.createPerson, (state, action) => {
      return adapter.addOne(action.person, state);
    }),
  
    on(personActionTypes.deletePerson, (state, action) => {
      return adapter.removeOne(action.personId, state);
    }),
  
    on(personActionTypes.updatePerson, (state, action) => {
      return adapter.updateOne(action.update, state);
    })
  );
  
  export const {selectAll, selectIds } = adapter.getSelectors();
