import { productAPI, authAPI } from './../api/api';
import { recipeAPI } from '../api/api';
import { AppStateType } from '.';
import { Recipe, Product } from '../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import jwt from 'jwt-decode';

const SET_USER = 'SET_USER';
const SET_USER_ID = 'SET_USER_ID';
const TOGGLE_AUTH = 'TOGGLE_AUTH';
const initialState = {
  isAuth: false as boolean,
  userId: '' as string,
};

type InitialState = typeof initialState;

const AuthReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

type ActionsTypes = SetUserActionType | setUserIdActionType | ToggleAuthActionType;

interface setUserIdActionType {
  type: typeof SET_USER_ID;
  userId: string;
}
export const setUserId = (userId: string): setUserIdActionType => ({
  type: SET_USER_ID,
  userId,
});

interface ToggleAuthActionType {
  type: typeof TOGGLE_AUTH;
  isAuth: boolean;
}
export const toggleAuth = (isAuth: boolean): ToggleAuthActionType => ({
  type: TOGGLE_AUTH,
  isAuth,
});
interface SetUserActionType {
  type: typeof SET_USER;
  user: Object;
}
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestSignIn = (email: string, password: string): ThunkType => {
  return async (dispatch, getState) => {
    const { data } = await authAPI.signIn(email, password);
    console.log(data);
    const token = { value: data.accessToken, time: new Date().getTime() };
    localStorage.setItem('accessToken', JSON.stringify(token));
    localStorage.setItem('refreshToken', data.refreshToken);
    const { userId } = jwt(data.accessToken);
    dispatch(setUserId(userId));
    dispatch(toggleAuth(true));
    console.log('sign in');
  };
};
export const requestRegister = (name: string, email: string, password: string): ThunkType => {
  return async (dispatch, getState) => {
    const { data } = await authAPI.register(name, email, password);
    console.log(data);
    console.log('registered');
  };
};
export default AuthReducer;
