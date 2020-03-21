import { recipeAPI } from '../api/api';
import { AppStateType } from '.';
import { Recipe } from '../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_RECIPES = 'SET_RECIPES';

const initialState = {
  recipes: [
    {
      id: 0,
      name: 'omelette',
      ingredients: ['egg', 'water', 'salt', 'pepper', 'butter'],
      preparationTimeMinutes: 7,
      description:
        'BEAT eggs, water, salt and pepper in small bowl until blended. HEAT butter in 6 to 8-inch nonstick omelet pan or skillet over medium-high heat until hot. TILT pan to coat bottom. POUR egg mixture into pan. Mixture should set immediately at edges.Gently PUSH cooked portions from edges toward the center with inverted turner so that uncooked eggs can reach the hot pan surface. CONTINUE cooking, tilting pan and gently moving cooked portions as needed.When top surface of eggs is thickened and no visible liquid egg remains, PLACE filling on one side of the omelet. FOLD omelet in half with turner. With a quick flip of the wrist, TURN pan and INVERT or SLIDE omelet onto plate. SERVE immediately.',
      rating: 5,
    },
  ] as Array<Recipe>,
};

type InitialState = typeof initialState;

const AppReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
    default:
      return state;
  }
};

type ActionsTypes = SetRecipeActionType;

interface SetRecipeActionType {
  type: typeof SET_RECIPES;
  recipes: Array<Recipe>;
}

export const setRecipes = (recipes: Array<Recipe>): SetRecipeActionType => ({
  type: SET_RECIPES,
  recipes,
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestGetRecipes = (): ThunkType => {
  return async (dispatch, getState) => {
    let data = await recipeAPI.getRecipes();
    dispatch(setRecipes(data.recipes));
  };
};

export const requestSetRecipe = (recipe: Recipe): ThunkType => {
  return async (dispatch, getState) => {
    let data = await recipeAPI.setRecipe(recipe);
    dispatch(setRecipes(data.recipes));
  };
};

export default AppReducer;
