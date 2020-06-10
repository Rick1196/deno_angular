import {Person} from '../entities/person';
import {PersonState} from './person.reducers';
import {selectAll, selectIds} from './person.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const personFeatureSelector = createFeatureSelector<PersonState>('persons');

export const getAllPersons = createSelector(
  personFeatureSelector,
  selectAll
);

export const arePersonsLoaded = createSelector(
  personFeatureSelector,
  state => state.personsLoaded
);