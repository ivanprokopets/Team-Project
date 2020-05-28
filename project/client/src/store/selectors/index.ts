import { createSelector } from 'reselect';
import { AppStateType } from '..';

export const getRecipes = (state: AppStateType) => {
  return state.app.recipes;
};
export const getUser = (state: AppStateType) => {
  return state.profile.user;
};
