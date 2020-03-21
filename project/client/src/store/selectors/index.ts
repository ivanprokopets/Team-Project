import { createSelector } from 'reselect';

import { AppStateType } from '..';

export const getRecipes = (state: AppStateType) => {
  return state.app.recipes;
};
