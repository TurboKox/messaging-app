import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user-state.model";

const selektorUserState = createFeatureSelector<UserState>('user')

export const selektorCzyZalogowany = createSelector(
  selektorUserState,
  (state :UserState) => state.czyZalogowany 
)